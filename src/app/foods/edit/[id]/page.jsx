'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

import { message } from 'antd';
import axios from 'axios';
import { Button, Datepicker, Label, Select, Spinner, TextInput } from 'flowbite-react';
import { useFormik } from 'formik';
import moment from 'moment/moment';
import { HiPlus } from 'react-icons/hi';
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2';
import * as Yup from 'yup';

import { API } from '@/constants';
import useAxios from '@/hooks/useFetch';
import { foodStatusOptions } from '../../index/foodInfo';

const { default: PageLayout } = require('@/layout/pageLayout');

const FoodEditPage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const params = useParams();
  const uid = params.id;
  const foodId = parseInt(params.id, 10);

  // Fetch old food data
  const {
    response: foodResponse,
    loading: foodLoading,
    error: foodError,
  } = useAxios({
    method: 'get',
    url: `${API}/food/?filter=ID%20eq%20${foodId}`,
  });

  // Fetch old data to form
  useEffect(() => {
    if (foodResponse) {
      console.log(foodResponse);
      formik.setValues({
        ...foodResponse[0],
      });
    }
  }, [foodResponse]);

  const formik = useFormik({
    initialValues: {
      name: '',
      unit: 'kg',
      note: '',
      status: 'Actice',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      unit: Yup.string().required('Required'),
      note: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log('submit data', payloadData.data);
      axios
        .put(`${API}/food/${foodId}`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();
          message.success('Update food success');
          router.push('/foods/index');
        })
        .catch((error) => {
          message.error('An error occurred');
          setSpinner(false);
          console.log('An error occurred:', error);
        });
    },
  });

  return (
    <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
      <div className="flex flex-col justify-between gap-4">
        <Link href={'/foods/index'} className="flex flex-row gap-2">
          {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
        </Link>
      </div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-[600px] bg-white px-4 py-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold">Edit Food</h2>
        <Label value="Food ID" />
        <div>{formik.values.id}</div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" value="Food name" />
          <TextInput id="name" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
          {formik.touched.name && formik.errors.name ? <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.name}</div> : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="unit" value="Unit" />
          <Select id="unit" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.unit}>
            <option>kg</option>
            <option>each</option>
          </Select>
          {formik.touched.unit && formik.errors.unit ? <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.unit}</div> : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="note" value="Note" />
          <TextInput
            id="note"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.note}
          />
          {formik.touched.note && formik.errors.note ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.note}</div>
          ) : null}
        </div>

        {/* // * Food status */}
        <div className="flex flex-col w-[500px] gap-2">
          <Label htmlFor="status" value="Species status" />
          <Select
            id="status"
            onChange={(e) => {
              const labelSelection = e.target.options[e.target.selectedIndex].text;
              formik.setFieldValue('status', labelSelection);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.status}
          >
            {foodStatusOptions.map((status, index) => {
              return (
                <option key={index} value={status.value}>
                  {status.label}
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

export default FoodEditPage;
