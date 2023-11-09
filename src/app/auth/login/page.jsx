"use client";
import firebase_app from "@/firebase/config";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GoogleButton from "react-google-button";
import Link from "next/link";
import { useAuthContext } from "@/contexts/authContext";
import { setToken, setUserInfo } from "@/helper";
import axios from "axios";
import { API } from "@/constants";
import { message } from "antd";

const { Button, Label, TextInput, Spinner } = require("flowbite-react");

const auth = getAuth(firebase_app);
const googleProvider = new GoogleAuthProvider();

const LoginPage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const { setUser } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      axios
        .post(`${API}/user/login`, values)
        .then((response) => {
          console.log(response);
          // Navigation to homepage
          setUserInfo(JSON.stringify(response.data.userInfo));
          setToken(response.data.token);

          router.push("/birds/index");
          // Handle success.
          setSpinner(false);
        })
        .catch((error) => {
          // Handle error.
          setSpinner(false);
          console.log("An error occurred:", error.response);
        });
    },
  });

  const handleGoogleLogin = async () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        var credential = GoogleAuthProvider.credentialFromResult(result);

        // This gives you a Google Access Token. You can use it to access the Google API.
        var trueToken = auth.currentUser.accessToken;
        console.log(trueToken);
        console.log(auth.currentUser);
        message.info("Validating info", 0);
        axios
          .post(`${API}/user/firebase`, { firebaseToken: trueToken })
          .then((response) => {
            console.log(response);
            // Navigation to homepage
            setUser(response.data.userInfo);
            setToken(response.data.token);

            router.push("/");
            message.destroy();
          });
      })
      .catch((error) => {
        // Handle error.
        setSpinner(false);
        console.log("An error occurred:", error.response);
      });
  };

  return (
    <div className="h-[100vh] px-[1rem] md:px-[2rem] lg:px-[3rem] xl:px-[10rem]">
      <div className="flex w-full gap-4 justify-center items-center mx-auto h-[100vh]">
        <form
          onSubmit={formik.handleSubmit}
          className="w-6/12 px-[100px] flex flex-col gap-2"
        >
          <h3 className="text-3xl font-bold whitespace-nowrap">
            Welcome to <br />
            <span className="text-[#444444]">Bird Farm Meal System</span>
          </h3>

          <Label
            htmlFor="email"
            value="Email"
            className="text-sm font-normal"
          />
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-xs text-red-600 dark:text-red-400">
              {formik.errors.email}
            </div>
          ) : null}

          <Label
            htmlFor="password"
            value="Password"
            className="text-sm font-normal"
          />
          <TextInput
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-xs text-red-600 dark:text-red-400">
              {formik.errors.password}
            </div>
          ) : null}

          <Button type="submit" color="dark" size="sm">
            {spinner ? (
              <div className="flex justify-center items-center gap-4">
                <Spinner aria-label="Spinner button example" />
                <p>Loading...</p>
              </div>
            ) : (
              <>Login</>
            )}
          </Button>
          <div className="w-6/12 justify-center items-center flex flex-col mx-auto gap-2">
            <GoogleButton onClick={handleGoogleLogin} />
          </div>
        </form>

        <div className="w-6/12 relative">
          <Image
            src="https://thuthuatnhanh.com/wp-content/uploads/2021/11/Hinh-anh-chim-chao-mao-sac-net-va-dep-nhat.jpg?fbclid=IwAR3W60eSDugGeS5fBfTpfHfX79KkZBLaP-rdic2sUHk8Vu2C6REkxDabOMU"
            sizes="100vh"
            fill
            style={{
              objectFit: "contain",
            }}
            alt="Login background"
            className="!static object-fill"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
