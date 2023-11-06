"use client";
import {
  Button,
  Label,
  Select,
  TextInput,
  Datepicker,
  Spinner,
} from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { message } from "antd";
import { HiPlus } from "react-icons/hi";
import moment from "moment/moment";
import axios from "axios";
import { API } from "@/constants";

const { default: PageLayout } = require("@/layout/pageLayout");

const UserCreatePage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim;
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      Password: "",
      phoneNumber: "",
      role: 1,
      status: 1,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string()
        .matches(emailRegExp, "Email is not valid")
        .required("Required"),
      Password: Yup.string().required("Required"),
      phoneNumber: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Required"),
      role: Yup.number().required("Required"),
      status: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log(payloadData.data);
      axios
        .post(`${API}/user`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();

          router.push("/users/index");
        })
        .then((response) => {
          message.success("Add new user success");
        })
        .catch((error) => {
          message.error("An error occurred");
          setSpinner(false);
          console.log("An error occurred:", error.response);
        });
    },
  });

  return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <div className="flex flex-col justify-between gap-4">
            <Link href={"/users/index"} className="flex flex-row gap-2">
              {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
            </Link>
            <h2 className="text-3xl font-bold">Add new user</h2>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 w-[600px]"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" value="Full name" />
              <TextInput
                id="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-xs text-red-600 dark:text-red-400">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" value="email" />
              <TextInput
                id="email"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-xs text-red-600 dark:text-red-400">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="Password" value="Password" />
              <TextInput
                id="Password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Password}
              />
              {formik.touched.Password && formik.errors.Password ? (
                <div className="text-xs text-red-600 dark:text-red-400">
                  {formik.errors.Password}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phoneNumber" value="Phone number" />
              <TextInput
                id="phoneNumber"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-xs text-red-600 dark:text-red-400">
                  {formik.errors.phoneNumber}
                </div>
              ) : null}
            </div>
            <Button type="submit">
              {spinner ? (
                <div className="flex justify-center items-center gap-4">
                  <Spinner aria-label="Spinner button example" />
                  <p>Loading...</p>
                </div>
              ) : (
                <>Submit</>
              )}
            </Button>
          </form>
        </div>
      </PageLayout>
  );
};

export default UserCreatePage;
