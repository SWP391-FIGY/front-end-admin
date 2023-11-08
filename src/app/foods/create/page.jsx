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

const FoodCreatePage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      nutritionalIngredients: '',
      storageCondition: 'keep in cool places',
      unit: 'kg',
      standardPrice: '',
      safetyThreshold: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      nutritionalIngredients: Yup.string().required('Required'),
      storageCondition: Yup.string().required('Required'),
      unit: Yup.string().required('Required'),
      standardPrice: Yup.number().required('Required'),
      safetyThreshold: Yup.number().required('Required'),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log(payloadData.data);
      axios
        .post(`${API}/food`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();
          
          router.push("/foods/index")
        })
        .then((response) => {
          message.success("Add new food success");
        })
        .catch((error) => {
          message.error("An error occurred");
          setSpinner(false);
          console.log("An error occurred:", error);
        });
    },
  })

  return (
    <PageLayout>
      <div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
      <div className='flex flex-col justify-between gap-4'>
          <Link href={'/foods/index'} className="flex flex-row gap-2">{<HiOutlineArrowSmallLeft className="self-center" />} Back to list</Link>
          <h2 className='text-3xl font-bold'>Add new Inventory</h2>

        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="name"
              value="Food name"
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
              htmlFor="nutritionalIngredients"
              value="Nutritional ingredients"
            />
            <TextInput
              id="nutritionalIngredients"

              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nutritionalIngredients}
            />
            {formik.touched.nutritionalIngredients && formik.errors.nutritionalIngredients ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.nutritionalIngredients}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="storageCondition"
              value="Storage condition"
            />
            <Select
              id="storageCondition"

              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.storageCondition}
            >
              <option>keep in cool places</option>
              <option>refrigerated</option>

            </Select>
            {formik.touched.storageCondition && formik.errors.storageCondition ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.storageCondition}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="unit"
              value="Unit"
            />
            <Select
              id="unit"

              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.unit}
            >
              <option>kg</option>
              <option>each</option>

            </Select>
            {formik.touched.unit && formik.errors.unit ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.unit}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="standardPrice"
              value="Standard price (VND)"
            />
            <TextInput
              id="standardPrice"

              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.standardPrice}
            />
            {formik.touched.standardPrice && formik.errors.standardPrice ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.standardPrice}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="safetyThreshold"
              value="Safety threshold"
            />
            <TextInput
              id="safetyThreshold"

              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.safetyThreshold}
            />
            {formik.touched.safetyThreshold && formik.errors.safetyThreshold ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.safetyThreshold}
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

export default FoodCreatePage