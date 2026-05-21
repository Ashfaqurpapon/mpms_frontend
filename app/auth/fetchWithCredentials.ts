// Import necessary modules and types
import { logedUserCredentials } from "./getUserCredentials";
import jwt from "jsonwebtoken";
import {
  ApiRouteConstant,
  RouteCacheingConstant,
} from "@/lib/api-route-constant";
import { ApiResponse } from "@/lib/api-lib";


const BASE_URL = ApiRouteConstant.BASE_URL;
const MAX_TIME_REFRESH = 60 * 1000;

// Define the main function for making authenticated requests
export default async function fetchWithLoginCredentials<T>(
  path: string,
  crudMethod: string,
  body?: any,
  cache: RequestCache = RouteCacheingConstant.DEFAULT
): Promise<ApiResponse<T>> {
  const accessToken = logedUserCredentials.getAccessToken();
  if (!accessToken) {
    return {
      success: false,
      message: "No credentials provided",
      statusCode: 401,
    };
  }

  const tokenExpiresTime = getAccessTokenExpireTime(accessToken).getTime();
  // Check if the access token is about to expire, and refresh it if needed
  if (tokenExpiresTime - (Date.now() + MAX_TIME_REFRESH) < 0) {
    // Attempt to refresh the tokens
    const newAccessToken = await requestForRefreshAccessToken();
   
    if (!newAccessToken) {
      return {
        success: false,
        message: "Unable to refresh access token",
        statusCode: 401,
      };
    }

    const tokenExpiresTime = getAccessTokenExpireTime(newAccessToken).getTime();
    logedUserCredentials.setAccessToken(newAccessToken);
    return await makeFetch<T>(path, newAccessToken, crudMethod, cache, body);
  } else {
    return makeFetch<T>(path, accessToken, crudMethod, cache, body);
  }
}

// Function to refresh user tokens
async function requestForRefreshAccessToken(): Promise<string | undefined> {
  try {
    const refreshToken = logedUserCredentials.getRefreshTokenFromCookies();

    const res = await fetch(
      `${BASE_URL}${ApiRouteConstant.ROUTES.REFRESH_ACCESS_TOKEN}`,
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    const json = await res.json();
    // ✅ Expected backend structure
    if (json?.success && json?.data?.accessToken) {
      console.log("Limon Access token refreshed successfully!");
      return json.data.accessToken as string;
    } else {
      console.warn("Limon Unexpected refresh response:", json);
      return undefined;
    }
  } catch (error) {
    console.error("Limon Error refreshing access token:", error);
    return undefined;
  }
}

function getAccessTokenExpireTime(token: string): Date {
  const decoded: any = jwt.decode(token);
  const date = new Date(decoded.exp * 1000);
 
  return date;
}

async function makeFetch<T>(
  path: string,
  accessToken: string,
  crudMethod: string,
  cache: RequestCache = RouteCacheingConstant.DEFAULT,
  body?: any
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${ApiRouteConstant.BASE_URL}${path}`, {
      method: crudMethod,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache,
      body: body ? JSON.stringify(body) : undefined,
    });
    const contentType = res.headers.get("content-type");
    const result = contentType?.includes("application/json")
      ? await res.json()
      : await res.text();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || `Request failed with status ${res.status}`,
        statusCode: res.status,
      };
    }

    return {
      success: true,
      data: result?.data ?? result,
      message: result?.message,
      statusCode: res.status,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Network error occurred",
      statusCode: 500,
    };
  }
}
