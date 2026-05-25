export const ApiRouteConstant = {

  BASE_URL: "https://mpms-backend-emhp.onrender.com",
  // BASE_URL: "http://localhost:8000",
  CLOUDINARY_IMAGE: "https://api.cloudinary.com/v1_1/dgzufd7vb/image/upload",
  TIMEOUT_MS: 15000,
  PROBABLE_MAXIMUM_PRODUCT: 1000,
  ROUTES: {
    //login related
    LOGIN: "/api/auth/login",
    PROJECT_CREATE: "/api/project/create",
    USER_ME: "/api/user/me",
    SIGN_UP_ROUTES: "/api/user/signup",
    PROJECT_GET_ALL: "/api/project",
    PROJECT_GET_SINGLE: "/api/project",
    SPRINT_CREATE: "/api/sprint/create",
    SPRINT_GET_ALL: "/api/sprint",
    MEMBER_CREATE: "/api/member/create",
    GET_USER_BY_EMAIL:"/api/user/getUserByEmail",
    MEMBERS_GET_ALL: "/api/member/",
    TASK_CREATE: "/api/task/create",
    TASKS_GET_ALL: "/api/task",
    MY_PROJECT_GET_ALL: "/api/project/myProject",





    REFRESH_ACCESS_TOKEN: "/api/auth/refresh-token",
    UPDATE_USER_DATA: "/api/user/updateUser",
    CHANGE_PASSWORD: "/api/auth/change-password",

   
  },
} as const;

export const RouteCacheingConstant = {
  DEFAULT: "default",
  NO_STORE: "no-store",
  RELOAD: "reload",
  NO_CACHE: "no-cache",
  FORCE_CACHE: "force-cache",
  ONLY_IF_CACHED: "only-if-cached",
} as const;

export type RouteCacheingType =
  (typeof RouteCacheingConstant)[keyof typeof RouteCacheingConstant];

export const CrudMethodConstant = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;
export type CrudMethod =
  (typeof CrudMethodConstant)[keyof typeof CrudMethodConstant];
