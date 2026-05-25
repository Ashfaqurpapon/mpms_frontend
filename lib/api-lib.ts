import fetchWithLoginCredentials from "@/app/auth/fetchWithCredentials";
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


    //-------------------------------------------------------------------------------------------------

    //add project

    async createProject(projectData: any) {
        const res = await fetchWithLoginCredentials(
            ApiRouteConstant.ROUTES.PROJECT_CREATE,
            "POST",
            projectData
        );

        if (!res.success) {

            throw new Error(res.message || "Failed to create Product");
        }

        return res.data;




    },

    //-------------------------------------------------------------------------------------------------



    async getAllProjects(params?: {
        page?: number;
        limit?: number;

    }) {
        const query = new URLSearchParams({
            page: String(params?.page || 1),
            limit: String(params?.limit || 10),

        });

        const accessToken = localStorage.getItem("authToken");

        const res = await fetch(
            `${ApiRouteConstant.BASE_URL}${ApiRouteConstant.ROUTES.PROJECT_GET_ALL
            }?${query.toString()}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(accessToken && { Authorization: `${accessToken}` }),
                },
            }
        );

        if (!res.ok) throw new Error("Failed to fetch projects");

        const result = await res.json();
        return result.data; // contains meta + data
    },



    //----------------------------------------------------------------------------------------------------------------------------

    //get single product Customer

    async getSingleProduct(projectId: string) {
        const accessToken = localStorage.getItem("authToken");

        // console.log("royte", accessToken);
        const res = await fetch(
            `${ApiRouteConstant.BASE_URL}${ApiRouteConstant.ROUTES.PROJECT_GET_SINGLE}/${projectId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(accessToken && { Authorization: `${accessToken}` }),
                },
            }
        );

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Failed to fetch product: ${errorText}`);
        }

        const result = await res.json();
        return result.data;
    },
    //-------------------------------------------------------------------------------------------------

    //add sprint

    async createSprint(sprintData: any) {
        const res = await fetchWithLoginCredentials(
            ApiRouteConstant.ROUTES.SPRINT_CREATE,
            "POST",
            sprintData
        );

        if (!res.success) {

            throw new Error(res.message || "Failed to create Sprint");
        }

        return res.data;




    },

    //-------------------------------------------------------------------------------------------------------------------

    async getAllSprints(params?: {
        page?: number;
        limit?: number;
        projectId: string;

    }) {
        const query = new URLSearchParams({
            page: String(params?.page || 1),
            limit: String(params?.limit || 10),
            ...(params?.projectId ? { projectId: params.projectId } : {}),


        });

        const accessToken = localStorage.getItem("authToken");

        const res = await fetch(
            `${ApiRouteConstant.BASE_URL}${ApiRouteConstant.ROUTES.SPRINT_GET_ALL
            }?${query.toString()}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(accessToken && { Authorization: `${accessToken}` }),
                },
            }
        );

        if (!res.ok) throw new Error("Failed to fetch projects");

        const result = await res.json();
        return result.data; // contains meta + data
    },


    //----------------------------------------------------------------------------------------------------------------------------

    //get single Sprint

    async getSingleSprint(projectId: string) {
        const accessToken = localStorage.getItem("authToken");

        // console.log("royte", accessToken);
        const res = await fetch(
            `${ApiRouteConstant.BASE_URL}${ApiRouteConstant.ROUTES.PROJECT_GET_SINGLE}/${projectId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(accessToken && { Authorization: `${accessToken}` }),
                },
            }
        );

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Failed to fetch product: ${errorText}`);
        }

        const result = await res.json();
        return result.data;
    },


    //-------------------------------------------------------------------------------------------------

    //add sprint

    async createMember(sprintData: any) {
        const res = await fetchWithLoginCredentials(
            ApiRouteConstant.ROUTES.MEMBER_CREATE,
            "POST",
            sprintData
        );

        if (!res.success) {

            throw new Error(res.message || "Failed to create Member");
        }

        return res.data;




    },
    //-------------------------------------------------------------------------------------------------------------------

    async getUserByEmail(params?: {
        // page?: number;
        // limit?: number;
        email: string;

    }) {
        const query = new URLSearchParams({
            // page: String(params?.page || 1),
            // limit: String(params?.limit || 10),
            ...(params?.email ? { email: params.email } : {}),


        });




        const accessToken = localStorage.getItem("authToken");

        const res = await fetch(
            `${ApiRouteConstant.BASE_URL}${ApiRouteConstant.ROUTES.GET_USER_BY_EMAIL
            }?${query.toString()}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(accessToken && { Authorization: `${accessToken}` }),
                },
            }
        );

        if (!res.ok) throw new Error("Failed to fetch user");

        const result = await res.json();
        return result.data; // contains meta + data
    },

    //-------------------------------------------------------------------------------------------------------------------

    async getAllMembers(params?: {
        page?: number;
        limit?: number;
        projectId: string;

    }) {
        const query = new URLSearchParams({
            page: String(params?.page || 1),
            limit: String(params?.limit || 10),
            ...(params?.projectId ? { projectId: params.projectId } : {}),


        });


        const accessToken = localStorage.getItem("authToken");

        const res = await fetch(
            `${ApiRouteConstant.BASE_URL}${ApiRouteConstant.ROUTES.MEMBERS_GET_ALL
            }?${query.toString()}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(accessToken && { Authorization: `${accessToken}` }),
                },
            }
        );

        if (!res.ok) throw new Error("Failed to fetch projects");

        const result = await res.json();
        return result.data; // contains meta + data
    },

    //add task

    async createTask(taskData: any) {
        const res = await fetchWithLoginCredentials(
            ApiRouteConstant.ROUTES.TASK_CREATE,
            "POST",
            taskData
        );

        if (!res.success) {

            throw new Error(res.message || "Failed to create Member");
        }

        return res.data;




    },
    //-------------------------------------------------------------------------------------------------------------------

    async getAllTasks(params?: {
        page?: number;
        limit?: number;
        sprint_id: string;

    }) {
        const query = new URLSearchParams({
            page: String(params?.page || 1),
            limit: String(params?.limit || 10),
            ...(params?.sprint_id ? { sprint_id: params.sprint_id } : {}),


        });


        const accessToken = localStorage.getItem("authToken");

        const res = await fetch(
            `${ApiRouteConstant.BASE_URL}${ApiRouteConstant.ROUTES.TASKS_GET_ALL
            }?${query.toString()}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(accessToken && { Authorization: `${accessToken}` }),
                },
            }
        );

        if (!res.ok) throw new Error("Failed to fetch projects");

        const result = await res.json();
        return result.data; // contains meta + data
    },

    async getMyProject(params?: {
        // page?: number;
        // limit?: number;
        email: string;

    }) {
        const query = new URLSearchParams({
            // page: String(params?.page || 1),
            // limit: String(params?.limit || 10),
            ...(params?.email ? { email: params.email } : {}),


        });

       
        
        const accessToken = localStorage.getItem("authToken");

        const res = await fetch(
            `${ApiRouteConstant.BASE_URL}${ApiRouteConstant.ROUTES.MY_PROJECT_GET_ALL
            }?${query.toString()}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(accessToken && { Authorization: `${accessToken}` }),
                },
            }
        );

        if (!res.ok) throw new Error("Failed to fetch projects");

        const result = await res.json();
        return result.data; // contains meta + data
    },
}