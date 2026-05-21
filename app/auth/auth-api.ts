import { LoggedTokenAnsUser } from "@/lib/api-response-classs";
import { ApiRouteConstant } from "@/lib/api-route-constant";
import { axiosInterceptors } from "@/lib/axios-interceptors";
import { logedUserCredentials } from "./getUserCredentials";

export const authApi = {
  async loginUser(productData: any): Promise<LoggedTokenAnsUser | null> {
    try {
      const res = await axiosInterceptors.post(
        ApiRouteConstant.ROUTES.LOGIN,
        productData
      );
     
      const accessToken = res.data?.data?.accessToken;
      const refreshToken = res.data?.data?.refreshToken;

      if (!accessToken || !refreshToken) return null;

      logedUserCredentials.setAccessToken(accessToken);
      logedUserCredentials.setRefreshTokenInCookies(refreshToken);

      const userRes = await axiosInterceptors.get(
        ApiRouteConstant.ROUTES.USER_ME
      );

      console.log("ff",userRes);
      
     
      return new LoggedTokenAnsUser(accessToken, userRes.data?.data);
    } catch (error: any) {
      console.error("Login failed:", error.message || error);
      return null;
    }
  },
};
