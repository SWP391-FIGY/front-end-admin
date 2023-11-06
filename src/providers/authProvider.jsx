"use client";
import React, { useState, useEffect } from "react";
import { message } from "antd";
import { getToken } from "@/helper";
import { API, BEARER, USER_INFO } from "@/constants";
import { AuthContext } from "@/contexts/authContext";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const authToken = getToken();

  const fetchLoggedInUser = async (token) => {
    setIsLoading(true);
    try {
      axios.post(`${API}/user/me`, {
        userToken: `${token}`,
      }).then((response) => {

        setUserData(response.data);
      })
    } catch (error) {
      console.error(error);
      message.error("Error While Getting Logged In User Details");
      
      router.push('/auth/index')
    } finally {
      setIsLoading(false);
    }
  };

  const handleUser = (user) => {
    setUserData(user);
  };

  useEffect(() => {
    if (authToken) {
      fetchLoggedInUser(authToken);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{ user: userData, setUser: handleUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
