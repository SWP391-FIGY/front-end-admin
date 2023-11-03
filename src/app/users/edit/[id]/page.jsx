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

const { default: PageLayout } = require("@/layout/pageLayout")

const UserCreatePage = () => {
  const router = useRouter();
  const params = useParams();
  const uid = params.id;

  console.log('editing id',uid);
  
  const [spinner, setSpinner] = useState(false)
  const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
  const EmailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm
  const formik = useFormik({
    initialValues: {
      Name: '',
      Email: '',
      Password: '',
      PhoneNumber: '',
      Role: 'Bird Carer',
      Status: 'Status 1',
    },
    validationSchema: Yup.object({
      Name: Yup.string().required('Required'),
      Email: Yup.string().matches(EmailRegExp, 'Email is not valid').required('Required'),
      Password: Yup.string().required('Required'),
      PhoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
      Role: Yup.string().required('Required'),
      Status: Yup.string().required('Required'),
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
          
          router.push("/users/index")
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
  })

  return (
    <PageLayout>
      <div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
      <div className='flex flex-col justify-between gap-4'>
          <Link href={'/users/index'} className="flex flex-row gap-2">{<HiOutlineArrowSmallLeft className="self-center" />} Back to list</Link>
          <h2 className='text-3xl font-bold'>Add new user</h2>

        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="Name"
              value="User name"
            />
            <TextInput
              id="name"

              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Name}
            />
            {formik.touched.Name && formik.errors.Name ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.Name}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="Email"
              value="Email"
            />
            <TextInput
              id="Email"

              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Email}
            />
            {formik.touched.Email && formik.errors.Email ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.Email}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="Password"
              value="Password"
            />
            <TextInput
              id="Password"

              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Password}
            />
            {formik.touched.Password && formik.errors.Password ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.Password}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="PhoneNumber"
              value="Phone number"
            />
            <TextInput
              id="PhoneNumber"

              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.PhoneNumber}
            />
            {formik.touched.PhoneNumber && formik.errors.PhoneNumber ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.PhoneNumber}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="Role"
              value="User Role"
            />
            <Select
              id="Role"

              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Role}
            >
              <option>Staff</option>
              <option>Admin</option>

            </Select>
            {formik.touched.Role && formik.errors.Role ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.Role}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="Status"
              value="User Status"
            />
            <Select
              id="Status"

              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Status}
            >
              <option>Status 1</option>
              <option>Status 2</option>

            </Select>
            {formik.touched.Status && formik.errors.Status ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.Status}
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

export default UserCreatePage