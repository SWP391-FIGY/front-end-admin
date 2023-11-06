"use client";
import { userRoleEnums } from "@/app/users/index/userInfo";
import { useAuthContext } from "@/contexts/authContext";
import { message } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const AuthLayout = ({ children, allowedRoles }) => {
  const {user} = useAuthContext()
  const router = useRouter();

  console.log('current role',user);
  if (allowedRoles.find((role) => userRoleEnums[user.userInfo.role] === role)) {
    return <>{children}</>;
  }
  console.log("You are not allow to do this");
  message.error("You are not allow to do this");
  router.push("/auth/login");
};

export default AuthLayout;
