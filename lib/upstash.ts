"use server";

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL!;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

async function redisGet(key: string): Promise<string | null> {
  try {
    const res = await fetch(
      `${UPSTASH_REDIS_REST_URL}/get/${encodeURIComponent(key)}`,
      {
        headers: {
          Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error(`Failed to get key ${key}:`, await res.text());
      return null;
    }

    const data = await res.json();
    return data.result ?? null;
  } catch (error) {
    console.error("redisGet error:", error);
    return null;
  }
}

async function redisSet(
  key: string,
  value: string,
  ttlSeconds: number
): Promise<void> {
  try {
    const res = await fetch(
      `${UPSTASH_REDIS_REST_URL}/setex/${encodeURIComponent(
        key
      )}/${ttlSeconds}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Failed to setex key ${key}:`, errorText);
      throw new Error(`Redis setex failed: ${errorText}`);
    }

    const result = await res.json();
    console.log(`Redis setex success for key ${key}:`, result);
  } catch (error) {
    console.error("redisSet error:", error);
    throw error;
  }
}

async function redisDelete(key: string): Promise<void> {
  try {
    const res = await fetch(
      `${UPSTASH_REDIS_REST_URL}/del/${encodeURIComponent(key)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      console.error(`Failed to delete key ${key}:`, await res.text());
    }
  } catch (error) {
    console.error("redisDelete error:", error);
  }
}

export { redisGet, redisSet, redisDelete };
