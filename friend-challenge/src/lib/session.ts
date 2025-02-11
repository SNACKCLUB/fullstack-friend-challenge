import { destroyCookie, setCookie } from "nookies";

export function createSession(token: string) {
  setCookie(undefined, "auth.token", token, {
    maxAge: 60 * 60 * 24, //1 week
  });
}

export function deleteSession() {
  destroyCookie(undefined, "auth.token");
}
