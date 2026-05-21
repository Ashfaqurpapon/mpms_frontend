import { set } from "date-fns";
import { NextRequest } from "next/server";
import cookie from "js-cookie";
import { get } from "http";
export type UserCredentials = {
  accessToken: string;
};

export function getUserCredentials(): UserCredentials | null {
  let tokens = localStorage.getItem("authToken");
  if (!tokens) return null;
  let credentials: UserCredentials = {
    accessToken: tokens,
  };
  return credentials;
}

export const logedUserCredentials = {
  setAccessToken(token: string) {
    localStorage.setItem("authToken", token);
  },
  getAccessToken(): string | null {
    return localStorage.getItem("authToken");
  },
  setRefreshTokenInCookies(refreshToken: string) {
    cookie.set("refreshToken", refreshToken);
  },
  getRefreshTokenFromCookies(): string | undefined {
    let token = cookie.get("refreshToken");
    return token;
  },
};
