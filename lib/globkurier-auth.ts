"use server";

import { redisGet, redisSet, redisDelete } from "@/lib/upstash";

export async function forceRefreshToken(): Promise<string> {
  console.log("Wymuszam odświeżenie tokena...");

  // Wyczyść cache
  await Promise.all([
    redisDelete("globkurier:token"),
    redisDelete("globkurier:expiry"),
  ]);

  // Pobierz nowy token
  return await loginGlobkurier();
}

export async function validateToken(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${process.env.GLOBKURIER_API_URL}/auth/validate`, {
      method: "GET",
      headers: {
        "x-auth-token": token,
        Accept: "application/json",
      },
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function loginGlobkurier(): Promise<string> {
  const [cachedToken, expiryStr] = await Promise.all([
    redisGet("globkurier:token"),
    redisGet("globkurier:expiry"),
  ]);

  const now = Date.now();

  // Sprawdź czy token i expiry istnieją
  if (cachedToken && expiryStr) {
    // Wyczyść cudzysłowy z obu wartości
    const cleanToken =
      typeof cachedToken === "string"
        ? cachedToken.replace(/^"|"$/g, "")
        : String(cachedToken).replace(/^"|"$/g, "");

    const cleanExpiryStr =
      typeof expiryStr === "string"
        ? expiryStr.replace(/^"|"$/g, "")
        : String(expiryStr).replace(/^"|"$/g, "");

    const expiryTimestamp = parseInt(cleanExpiryStr, 10);

    console.log("Token cache check:", {
      rawToken: cachedToken,
      cleanToken: cleanToken.substring(0, 20) + "...",
      cleanExpiryStr,
      expiryTimestamp,
      now,
      isValid: !isNaN(expiryTimestamp) && now < expiryTimestamp,
    });

    // Dodaj 30-minutowy margines bezpieczeństwa
    const safetyMarginMs = 30 * 60 * 1000; // 30 minut
    if (!isNaN(expiryTimestamp) && now < expiryTimestamp - safetyMarginMs) {
      console.log("Token ważny w cache - zwracam z cache");
      return cleanToken;
    } else {
      console.log("Token wygasł lub nieprawidłowy expiry - czyszczę cache");
      // Wyczyść wygasły token
      await Promise.all([
        redisDelete("globkurier:token"),
        redisDelete("globkurier:expiry"),
      ]);
    }
  }

  // Pobierz nowy token
  console.log("Pobieranie nowego tokena...");

  const loginUrl = `${process.env.GLOBKURIER_API_URL}/auth/login`;
  console.log("Login URL:", loginUrl);

  const res = await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": "pl",
    },
    body: JSON.stringify({
      email: process.env.GLOBKURIER_API_LOGIN,
      password: process.env.GLOBKURIER_API_PASSWORD,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Login failed:", { status: res.status, body: text });
    throw new Error(`Login failed ${res.status}: ${text}`);
  }

  const data = await res.json();
  console.log("Login response:", data);

  if (!data.token) {
    throw new Error("No token in login response");
  }

  const token = data.token;
  // Ustaw expiry na 20 godzin (z marginesem bezpieczeństwa)
  const expiryMs = Date.now() + 20 * 60 * 60 * 1000;
  const ttlSeconds = 20 * 60 * 60; // 20 godzin TTL

  // Zapisywanie tokena i expiry z TTL
  await Promise.all([
    redisSet("globkurier:token", token, ttlSeconds),
    redisSet("globkurier:expiry", expiryMs.toString(), ttlSeconds),
  ]);

  console.log("Zapisano nowy token do cache:", {
    tokenPrefix: token.substring(0, 20) + "...",
    expiry: new Date(expiryMs).toISOString(),
  });

  return token;
}

export async function fetchWithToken<T>(
  endpoint: string,
  method: "GET" | "POST" = "GET",
  body?: any
): Promise<T> {
  const token = await loginGlobkurier();

  const makeRequest = async (authToken: string) => {
    // Poprawione budowanie URL
    const baseUrl = process.env.GLOBKURIER_API_URL || "";
    const cleanEndpoint = endpoint.startsWith("/")
      ? endpoint.substring(1)
      : endpoint;
    const url = baseUrl.endsWith("/")
      ? `${baseUrl}${cleanEndpoint}`
      : `${baseUrl}/${cleanEndpoint}`;

    console.log(
      "Making request to:",
      url,
      "with token:",
      authToken.substring(0, 20) + "..."
    );

    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "pl",
        "x-auth-token": authToken,
      },
    };

    if (method !== "GET" && body) {
      options.body = JSON.stringify(body);
    }

    return fetch(url, options);
  };

  const res = await makeRequest(token);

  // Jeśli 401, wyczyść cache i zwróć błąd - NIE twórz nowego tokena automatycznie
  if (res.status === 401) {
    console.log(
      "Token nieważny (401) - czyszczę cache, wymagane nowe logowanie"
    );

    // Wyczyść nieważny token z cache
    await Promise.all([
      redisDelete("globkurier:token"),
      redisDelete("globkurier:expiry"),
    ]);

    throw new Error("Token nieważny - wymagane ponowne uwierzytelnienie");
  }

  if (!res.ok) {
    const text = await res.text();
    console.error(`API request failed:`, {
      status: res.status,
      statusText: res.statusText,
      body: text,
      endpoint,
    });
    throw new Error(`API error ${res.status}: ${text}`);
  }

  return res.json();
}
