import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useCookie = (cookieName: string) => {
  const [cookie, setCookieValue] = useState("");
  useEffect(() => {
    const value = Cookies.get(cookieName);
    if (value) {
      setCookieValue(value);
    }
  }, [cookieName]);

  const setCookie = (value: string, options: Cookies.CookieAttributes) => {
    Cookies.set(cookieName, value, options);
    setCookieValue(value);
  };

  const removeCookie = () => {
    Cookies.remove(cookieName);
    setCookieValue("");
  };
  return [cookie, setCookie, removeCookie];
};

export default useCookie;
