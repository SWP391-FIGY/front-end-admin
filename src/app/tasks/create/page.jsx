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

const TaskCreatePage = () => {
  const [spinner, setSpinner] = useState(false)

  const formik = useFormik({
    initialValues: {
      BirdId: 1,
      CageId: 1,
      StaffId: 1,
      TaskName: "",
      DateTime: moment(new Date()).format('DD/MM/YYYY'),
      Description: "",
      Status: "Pending",
    },
    validationSchema: Yup.object({
      BirdId: Yup.number().required("Required"),
      CageId: Yup.number().required("Required"),
      StaffId: Yup.number().required("Required"),
      TaskName: Yup.string().required("Required"),
      DateTime: Yup.date().min(new Date(), "Date must be today or later").required("Required"),
      Description: Yup.string().required("Required"),
      Status: Yup.string().required("Required")
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log(payloadData.data);
      axios
        .post(`${API}/task`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();
          
          router.push("/tasks/index")
        })
        .then((response) => {
          message.success("Add new task success");
        })
        .catch((error) => {
          message.error("An error occurred");
          setSpinner(false);
          console.log("An error occurred:", error.response);
        });
    },
  });

  useEffect(() => {
    console.log(formik);
  }, [formik]);
  return (
    <PageLayout>
      <div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
      <div className='flex flex-col justify-between gap-4'>
          <Link href={'/tasks/index'} className="flex flex-row gap-2">{<HiOutlineArrowSmallLeft className="self-center" />} Back to list</Link>
          <h2 className='text-3xl font-bold'>Add new task</h2>

        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]">

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="BirdId"
              value="Bird"
            />
            <Select
              id="BirdId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.BirdId}
            >
                  <option value={1}>Bird 1</option>
                  <option value={2}>Bird 2</option>
                  <option value={3}>Bird 3</option>
            </Select>
            {formik.touched.BirdId && formik.errors.BirdId ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.BirdId}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="CageId" value="Bird cage" />
            <div className="flex w-full gap-2">
              <div className="w-[500px]">
                <Select
                  id="CageId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.CageId}
                >
                  <option value={1}>Cage 1</option>
                  <option value={2}>Cage 2</option>
                  <option value={3}>Cage 3</option>
                </Select>
              </div>
              <Link href={{pathname:"/cage/create", query: {...formik.values, 'bird-add':true}}}>
                <Button>
                  <div className="flex flex-row justify-center gap-2">
                    <div className="my-auto">
                      <HiPlus />
                    </div>
                    <p>Add new cage</p>
                  </div>
                </Button>
              </Link>
            </div>
            {formik.touched.CageId && formik.errors.CageId ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.CageId}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="StaffId"
              value="Staff"
            />
            <Select
              id="StaffId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.StaffId}
            >
                  <option value={1}>Staff 1</option>
                  <option value={2}>Staff 2</option>
                  <option value={3}>Staff 3</option>
            </Select>
            {formik.touched.StaffId && formik.errors.StaffId ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.StaffId}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="TaskName" value="Task name" />
            <TextInput
              id="TaskName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.TaskName}
            />
            {formik.touched.TaskName && formik.errors.TaskName ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.TaskName}
              </div>
            ) : null}
          </div>
          
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="DateTime" value="Date and Time" />
            <Datepicker 
              id="DateTime"
              selected={formik.values.DateTime}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd/MM/yyyy HH:mm"
              onChange={(date) => {
                formik.setFieldValue("DateTime", date);
              }}
            />
            {formik.touched.DateTime && formik.errors.DateTime ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.DateTime}
              </div>
            ) : null}
          </div>
          
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="Description" value="Description" />
            <TextInput
              id="Description"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Description}
            />
            {formik.touched.Description && formik.errors.Description ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.Description}
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
  );
};

export default TaskCreatePage;