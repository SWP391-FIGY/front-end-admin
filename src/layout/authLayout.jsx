"use client";
import { userRoleEnums } from "@/app/users/index/userInfo";
import { useAuthContext } from "@/contexts/authContext";
import { getUserInfo } from "@/helper";
import { message } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const AuthLayout = ({ children, allowedRoles }) => {
  const user = getUserInfo();
  const router = useRouter();

  console.log("current role", user);
  if (user && allowedRoles.find((role) => userRoleEnums[user.role] === role)) {
    return <>{children}</>;
  }

  router
    .push("/auth/login")
    .then((result) => message.error("You are not allow to do this"));
};

export default AuthLayout;
