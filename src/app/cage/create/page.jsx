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
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { useRouter, useSearchParams } from "next/navigation";
import { message } from "antd";
import axios from "axios";
import { API } from "@/constants";

const { default: PageLayout } = require("@/layout/pageLayout");

const CageCreatePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  
  const [spinner, setSpinner] = useState(false);

  const formik = useFormik({
    initialValues: {
      
      size: "90 x 60 x 90",
      color: "Black",
      area: "A",
      type: "Type 1",
      cageStatus: 0,
      capacity: 5,
    },
    validationSchema: Yup.object({
      
      size: Yup.string().required("Required"),
      color: Yup.string().required("Required"),
      area: Yup.string().required("Required"),
      type: Yup.string().required("Required"),
      capacity: Yup.number().min(1, "Capacity must greater than 0"),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log(payloadData.data);
      axios
        .post(`${API}/cage`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();
          
          router.push("/cage/index")
        })
        .then((response) => {
          message.success("Add new cage success");
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
          {searchParams && searchParams.get("bird-add") === "true" ? (
            <Link
              href={"#"}
              onClick={() => router.back()}
              className="flex flex-row gap-2"
            >
              {<HiOutlineArrowSmallLeft className="self-center" />} Back to bird
              info
            </Link>
          ) : (
            <Link href={"/cage/index"} className="flex flex-row gap-2">
              {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
            </Link>
          )}
          <h2 className="text-3xl font-bold">Add new Cage</h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]"
        >
          
          <div className="flex flex-col gap-2">
            <Label htmlFor="size" value="Cage size (cm)" />
            <TextInput
              id="size"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.size}
            />
            {formik.touched.size && formik.errors.size ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.size}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="color" value="Cage Color" />
            <TextInput
              id="color"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.color}
            />
            {formik.errors.color ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.color}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="area" value="Cage area" />
            <TextInput
              id="area"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.area}
            />
            {formik.touched.area && formik.errors.area ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.area}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type" value="Cage type" />
            <TextInput
              id="type"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.type}
            />
            {formik.touched.type && formik.errors.type ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.type}
              </div>
            ) : null}
          </div>

          
          <div className="flex flex-col gap-2">
            <Label htmlFor="capacity" value="Cage capacity" />
            <TextInput
              id="capacity"
              type="number"
              min={1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.capacity}
            />
            {formik.touched.capacity && formik.errors.capacity ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.capacity}
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

export default CageCreatePage;
