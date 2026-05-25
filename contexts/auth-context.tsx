"use client";

import type React from "react";

import { createContext, useContext, useState, useEffect } from "react";
import type { User } from "@/lib/types";
// import { dummyUsers } from "@/lib/dummy-data";
import { api } from "@/lib/api-lib";
import { authApi } from "@/app/auth/auth-api";

// import { analytics } from "@/utils/Analytics/AnalyticsManager";
// import { analyticsEventName } from "@/utils/Analytics/AnalyticsEventName";
// import { analyticsConstant } from "@/utils/Analytics/AnalyticsConstant";
// import { LimonLogger } from "@/utils/LogFiles/LimonLogger";

interface AuthContextType {
  user: User | null;
  login: (phone: string, password: string) => Promise<boolean>;
  signup: (name: string, phone: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // need to call backend API
  const login = async (email: string, password: string) => {
    // const foundUser = dummyUsers.find((u) => u.phone === phone);
    // const foundUser = api.loginUser({ phone: phone, password: password });
    // if (foundUser && password === "password") {
    //   setUser(foundUser);
    //   localStorage.setItem("user", JSON.stringify(foundUser));
    //   return true;
    // }
    // return false;

    const foundUser = await authApi.loginUser({
      email: email,
      password: password,
    });

    
    
    if (!foundUser) {
      // console.log("User not found");
      return false;
    }
    const userData: User = {
      id: foundUser.user._id,
      name: foundUser.user.name,
      email: foundUser.user.email,
      phone: foundUser.user.phone,
      role: foundUser.user.role
    };

    // console.log("check",userData);
    
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return true;
  };

//   const signup = (name: string, phone: string, password: string) => {
//     // Check if phone already exists
//     const existingUser = dummyUsers.find((u) => u.phone === phone);
//     if (existingUser) {
//       return false;
//     }

//     // Create new user
//     const newUser: User = {
//       id: Date.now().toString(),
//       name,
//       phone,
//       email: `${phone}@plantshop.com`, // Generate email from phone
//       role: "user",
//     };

//     // Add to dummy users (in real app, this would be API call)
//     dummyUsers.push(newUser);
//     setUser(newUser);
//     localStorage.setItem("user", JSON.stringify(newUser));
//     return true;
//   };

//   const fireLogOutAnalytics = () => {
//     LimonLogger.log(
//       "Logout button clicked analytics fired",
//       user?.id,
//       user?.phone,
//       analytics.getCurrentTimeStamp()
//     );
//     analytics.logEvent(analyticsEventName.LOGOUT_BUTTON_CLICKED, {
//       [analyticsConstant.USER_ID]: user?.id ?? "-1",
//       [analyticsConstant.USER_PHONE_NUMBER]: user?.phone ?? "-1",
//       [analyticsConstant.CURRENT_TIMESTAMP]: analytics.getCurrentTimeStamp(),
//     });
//   };

//   const logout = () => {
//     fireLogOutAnalytics();
//     setUser(null);
//     localStorage.removeItem("user");
//   };
//   const updateProfile = (name: string, phone: string, password?: string) => {
//     if (!user) return false;

//     const updatedUser: User = {
//       ...user,
//       name,
//       phone,
//       email: `${phone}@plantshop.com`,
//       ...(password && { password }),
//     };

//     setUser(updatedUser);
//     localStorage.setItem("user", JSON.stringify(updatedUser));

//     // Update in dummy users array
//     const userIndex = dummyUsers.findIndex((u) => u.id === user.id);
//     if (userIndex !== -1) {
//       dummyUsers[userIndex] = updatedUser;
//     }

//     return true;
//   };

  return (
    <AuthContext.Provider
      value={{ user, login, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
