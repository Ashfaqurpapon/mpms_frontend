export const ApiRouteConstant = {
  // BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.example.com",
  //   BASE_URL: "https://peace-plant-mxby.onrender.com",

  //BASE_URL: "https://peace-plant.onrender.com",
  BASE_URL: "http://localhost:8000",
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









    REFRESH_ACCESS_TOKEN: "/api/auth/refresh-token",
    UPDATE_USER_DATA: "/api/user/updateUser",
    CHANGE_PASSWORD: "/api/auth/change-password",

    UPLOAD: "/upload",
    CATEGORY_GET: "/api/productCategory",
    CATEGORY_CREATE: "/api/productCategory/create",
    CATEGORY_UPDATE: "/api/productCategory/update",
    CATEGORY_DELETE: "/api/productCategory/delete",
    
   


    PRODUCT_GET_ALL_ADMIN: "/api/product/allProduct",
    PRODUCT_GET_SINGLE_CUSTOMER: "/api/product/customer",
   
    PRODUCT_DELETE: "/api/product/delete",
    PRODUCT_GET_ALL_LEAF_CATEGORY_PRODUCTS: "/api/product/LeafCategoryProduct",
    PRODUCT_UPDATE: "/api/product/update",
    ORDER_CREATE: "/api/order/create",
    ORDER_GET_ALL_USER: "/api/order/user",
    ORDER_GET_ALL_ADMIN: "/api/order",
    ORDER_CHANGE_STATUS: "/api/order/status",
    ORDER_UPDATE: "/api/order/update",
    REVIEW_CREATE: "/api/review/create",
    REVIEW_GET_BY_PRODUCT: "/api/review/get-reviews",
    REVIEW_DELETE_BY_ADMIN: "/api/review/delete",
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
