import { ApiRouteConstant } from "./api-route-constant";
import { axiosInterceptors } from "./axios-interceptors";

export type ApiResponse<T = any> = {
    success: boolean;
    data?: T;
    message?: string;
    statusCode: number;
};

export const api = {

//------------------------------------------------------------------------------------------------------------


    async signUpUser(userData: any): Promise<ApiResponse> {
        try {
            const res = await axiosInterceptors.post(
                ApiRouteConstant.ROUTES.SIGN_UP_ROUTES,
                userData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            return {
                success: true,
                data: res.data?.data ?? res.data,
                message: res.data?.message || "Signup successful",
                statusCode: res.status,
            };
        } catch (error: any) {
            const status = error.response?.status ?? 500;
            const message =
                error.response?.data?.message ||
                error.message ||
                "Network error occurred";

           
            return {
                success: false,
                message,
                statusCode: status,
                data: error.response?.data,
            };
        }
    },
}