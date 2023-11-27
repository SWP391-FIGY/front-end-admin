'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { message } from 'antd';
import axios from 'axios';
import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react';
import { useFormik } from 'formik';
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2';
import * as Yup from 'yup';

import { API } from '@/constants';
import { getUserInfo } from '@/helper';
import useAxios from '@/hooks/useFetch';
import { userStatusEnums } from '../../index/userInfo';

const { default: PageLayout } = require('@/layout/pageLayout');

const UserEditPage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const params = useParams();
  const userId = parseInt(params.id, 10);

  //Handle user role
  const user = getUserInfo();
  const disabledRole = !user || user.role != 'Admin';

  //Fetch old user data
  const {
    response: userResponse,
    loading: userLoading,
    error: userError,
  } = useAxios({
    method: 'get',
    url: `${API}/user/?filter=Id%20eq%20${userId}`,
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

  const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim;
  const formik = useFormik({
    initialValues: {
      Id: userId,
      fullName: '',
      email: '',
      password: '',
      role: 1,
      status: 1,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Required'),
      email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Required'),
      password: Yup.string().required('Required'),
      role: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log('submit data', payloadData.data);
      axios
        .put(`${API}/user/${userId}`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();
          message.success('Update user success');
          router.push('/users/index');
        })
        .catch((error) => {
          message.error('An error occurred');
          setSpinner(false);
          console.log('An error occurred:', error.response);
        });
    },
  });

  return (
    <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
      <div className="flex flex-col justify-between gap-4">
        <Link href={'/users/index'} className="flex flex-row gap-2">
          {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
        </Link>
        <h2 className="text-3xl font-bold">Edit user</h2>
      </div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-[600px] bg-white px-4 py-8 rounded-lg shadow-lg">
        <Label value="User ID" />
        <div>{formik.values.Id}</div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="fullName" value="Full name" />
          <TextInput id="fullName" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fullName} />
          {formik.touched.fullName && formik.errors.fullName ? <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.fullName}</div> : null}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" value="email" />
          <TextInput id="email" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
          {formik.touched.email && formik.errors.email ? <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.email}</div> : null}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="Password" value="Password" />
          <TextInput id="password" type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="role" value="Role" />
          <Select id="role" disabled={disabledRole} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.role}>
            <option>Manager</option>
            <option>Staff</option>
          </Select>
          {formik.touched.role && formik.errors.role ? <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.role}</div> : null}
        </div>

        {/* // * User status */}
        <div className="flex flex-col w-[500px] gap-2">
          <Label htmlFor="status" value="Species status" />
          <Select
            id="status"
            onChange={(e) => {
              const stringSelection = e.target.value;
              formik.setFieldValue('status', parseInt(stringSelection));
            }}
            onBlur={formik.handleBlur}
            value={formik.values.status}
          >
            {userStatusEnums.map((status, index) => {
              return (
                <option key={index} value={index}>
                  {status}
                </option>
              );
            })}
          </Select>
          {formik.touched.status && formik.errors.status ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.status}</div>
          ) : null}
        </div>

        <Button type="submit">
          {spinner ? (
            <div className="flex items-center justify-center gap-4">
              <Spinner aria-label="Spinner button example" />
              <p>Loading...</p>
            </div>
          ) : (
            <>Submit</>
          )}
        </Button>
      </form>
    </div>
  );
};

export default UserEditPage;
