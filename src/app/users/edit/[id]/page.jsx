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
import { useParams } from "next/navigation";
import useAxios from "@/hooks/useFetch";
import { getUserInfo } from "@/helper";
import { userRoleEnums } from "../../index/userInfo";

const { default: PageLayout } = require("@/layout/pageLayout")

const UserEditPage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false)
  const params = useParams();
  const userId = parseInt(params.id, 10);

  //Handle user role
  const user = getUserInfo();
  const disabledRole = !user || userRoleEnums[user.role] != "Admin"

  //Fetch old user data
  const {
    response: userResponse,
    loading: userLoading,
    error: userError,
  } = useAxios({
    method: "get",
    url: `${API}/user/?filter=ID%20eq%20${userId}`,
  });
 
  //Fetch old data to form
  useEffect(() => {
    if (userResponse) {
      console.log(userResponse);
      formik.setValues({
        ...userResponse[0],
      });
    }
  }, [userResponse]);


  const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
  const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm
  const formik = useFormik({
    initialValues: {
      Id: userId,
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
      firebaseID: '',
      role: 1,
      status: 1,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Required'),
      password: Yup.string().required('Required'),
      phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
      role: Yup.number().required('Required'),
      status: Yup.number().required('Required'),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log('submit data',payloadData.data);
      axios
        .put(`${API}/user/${userId}`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();
          message.success("Update user success");
          router.push("/users/index");
        })
        .catch((error) => {
          message.error("An error occurred");
          setSpinner(false);
          console.log("An error occurred:", error.response);
        });
    },
  })

  return (
    <PageLayout>
      <div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
      <div className='flex flex-col justify-between gap-4'>
          <Link href={'/users/index'} className="flex flex-row gap-2">{<HiOutlineArrowSmallLeft className="self-center" />} Back to list</Link>
          <h2 className='text-3xl font-bold'>Edit user</h2>

        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="name"
              value="Full name"
            />
            <TextInput
              id="name"

              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.name}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="email"
              value="email"
            />
            <TextInput
              id="email"

              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="Password"
              value="Password"
            />
            <TextInput
              id="password"

              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="phoneNumber"
              value="Phone number"
            />
            <TextInput
              id="phoneNumber"

              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.phoneNumber}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="role"
              value="Role"
            />
            <Select
              id="role"
              disabled={disabledRole}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
            >              
              <option value="1">Manager</option>
              <option value="2">Staff</option>

            </Select>
            {formik.touched.role && formik.errors.role ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.role}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="status"
              value="Status"
            />
            <Select
              id="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
            >
              <option value="1">Activated</option>
              <option value="2">Deactivated</option>

            </Select>
            {formik.touched.status && formik.errors.status ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.status}
              </div>
            ) : null}
          </div>

          <Button type="submit">
            {spinner ? (
              <div className='flex justify-center items-center gap-4'>
                <Spinner aria-label='Spinner button example' />
                <p>Loading...</p>
              </div>
            ) : (
              <>Submit</>
            )}
          </Button>
        </form>
      </div>

    </PageLayout>
  )
}

export default UserEditPage