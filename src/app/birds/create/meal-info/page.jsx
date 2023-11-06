"use client";
import PageLayout from "@/layout/pageLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { HiOutlineArrowSmallLeft, HiPlus } from "react-icons/hi2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Datepicker, Label, Select, Spinner } from "flowbite-react";

const BirdMealCreatePage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);

  const formik = useFormik({
    initialValues: {
      startDate: new Date(),
      endDate: new Date(),
      menuId: 1,
      birdId: 1,
    },
    validationSchema: Yup.object({
      startDate: Yup.date()
        .min(new Date().toLocaleDateString(), "Start date must after today")
        .required("Required"),
      endDate: Yup.date()
        .min(Yup.ref("startDate"), "End date must be after start date")
        .required("Required"),
      menuId: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log("Submitted");
      console.log(payloadData);
      // axios
      //   .post(`${API}/feedbacks`, payloadData)
      //   .then(response => {
      //     setSpinner(false)
      //     formik.resetForm()
      //   })
      //   .catch(error => {
      //     setSpinner(false)
      //     console.log('An error occurred:', error.response)
      //   })

      router.push("/birds/index");
    },
  });

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col justify-between gap-4">
          <Link
            href={"#"}
            onClick={() => router.back()}
            className="flex flex-row gap-2"
          >
            {<HiOutlineArrowSmallLeft className="self-center" />} Back to Bird
            info
          </Link>
          <h2 className="text-3xl font-bold">Add bird Meal info</h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-full"
        >
          {/* // * Feeding plan startDate */}
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="startDate" value="Feeding plan Start Date" />
            <Datepicker
              id="startDate"
              language="vi-VN"
              onSelectedDateChanged={(date) => {
                console.log(new Date(date));
                formik.setFieldValue("startDate", date);
                console.log("value", formik.values);
                console.log("errors", formik.errors);
              }}
              onBlur={formik.handleBlur}
              onSelect={(e) => {
                console.log(e);
              }}
            />
            {formik.touched.startDate && formik.errors.startDate ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.startDate}
              </div>
            ) : null}
          </div>
          {/* // * Feeding plan endDate */}
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="endDate" value="Feeding plan End Date" />
            <Datepicker
              id="endDate"
              language="vi-VN"
              onSelectedDateChanged={(date) => {
                console.log(new Date(date));
                formik.setFieldValue("endDate", date);
                console.log("value", formik.values);
                console.log("errors", formik.errors);
              }}
              onBlur={formik.handleBlur}
              onSelect={(e) => {
                console.log(e);
              }}
            />
            {formik.touched.endDate && formik.errors.endDate ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.endDate}
              </div>
            ) : null}
          </div>
          {/* // * Bird cage */}
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="cageId" value="Bird cage" />
            <div className="flex w-full gap-2">
              <div className="w-[500px]">
                <Select
                  id="cageId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cageId}
                >
                  <option value={1}>Meal 1</option>
                  <option value={2}>Meal 2</option>
                  <option value={3}>Meal 3</option>
                </Select>
              </div>
              {/* <Link href={"/cage/create?bird-add=true"}> */}
              <Link href={"#"}>
                <Button>
                  <div className="flex flex-row justify-center gap-2">
                    <div className="my-auto">
                      <HiPlus />
                    </div>
                    <p>Add new meal</p>
                  </div>
                </Button>
              </Link>
            </div>
            {formik.touched.cageId && formik.errors.cageId ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.cageId}
              </div>
            ) : null}
          </div>
          <Button type="submit" className="w-[500px] ">
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

export default BirdMealCreatePage;