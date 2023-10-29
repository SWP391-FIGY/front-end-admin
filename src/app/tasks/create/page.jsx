'use client'
import { Button, Label, Select, TextInput, Spinner, Datepicker } from "flowbite-react"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import Link from "next/link"
import { HiOutlineArrowSmallLeft, HiPlus } from "react-icons/hi2"

const { default: PageLayout } = require("@/layout/pageLayout")

const TaskCreatePage = () => {
  const [spinner, setSpinner] = useState(false)

  const formik = useFormik({
    initialValues: {
      birdId: 1,
      cageId: 1,
      staffId: 1,
      taskName: "",
      dateAndTime: "",
      description: "",
      status: "Status 1",
    },
    validationSchema: Yup.object({
      birdId: Yup.number().required("Required"),
      cageId: Yup.number().required("Required"),
      staffId: Yup.number().required("Required"),
      taskName: Yup.string().required("Required"),
      dateAndTime: Yup.date().min(new Date().toLocaleDateString(), "Birth date must after today").required("Required"),
      description: Yup.string().required("Required"),
      status: Yup.number().required("Required")
    }),
    onSubmit: values => {
      setSpinner(true)
      const payloadData = {
        data: values,
      };
      console.log("Submitted");
      console.log(values);
      axios
        .post(`${API}/feedbacks`, payloadData)
        .then(response => {
          setSpinner(false)
          formik.resetForm()
        })
        .catch(error => {
          setSpinner(false)
          console.log('An error occurred:', error.response)
        });
    },
  });

  useEffect(() => {
    console.log(formik);
  }, [formik]);
  return (
    <PageLayout>
      <div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
        <div className='flex flex-row justify-between'>
        <Link href={"/tasks/index"} className="flex flex-row gap-2">
            {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
          </Link>
          <h2 className='text-3xl font-bold'>Add new task</h2>

        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]">

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="birdId"
              value="Bird"
            />
            <Select
              id="birdId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.birdId}
            >
                  <option value={1}>Bird 1</option>
                  <option value={2}>Bird 2</option>
                  <option value={3}>Bird 3</option>
            </Select>
            {formik.touched.birdId && formik.errors.birdId ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.birdId}
              </div>
            ) : null}
          </div>

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
            {formik.touched.cageId && formik.errors.cageId ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.cageId}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="staffId"
              value="Staff"
            />
            <Select
              id="staffId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.staffId}
            >
                  <option value={1}>Staff 1</option>
                  <option value={2}>Staff 2</option>
                  <option value={3}>Staff 3</option>
            </Select>
            {formik.touched.staffId && formik.errors.staffId ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.staffId}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="taskName" value="Task name" />
            <TextInput
              id="taskName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.taskName}
            />
            {formik.touched.taskName && formik.errors.taskName ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.taskName}
              </div>
            ) : null}
          </div>
          
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="dateAndTime" value="Date and Time" />
            <Datepicker 
              id="dateAndTime"
              selected={formik.values.dateAndTime}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd/MM/yyyy HH:mm"
              onChange={(date) => {
                formik.setFieldValue("dateAndTime", date);
              }}
            />
            {formik.touched.dateAndTime && formik.errors.dateAndTime ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.dateAndTime}
              </div>
            ) : null}
          </div>
          
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="description" value="Description" />
            <TextInput
              id="description"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.description}
              </div>
            ) : null}
          </div>
          
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="status" value="Task status" />
            <Select
              id="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
            >
              <option>Status 1</option>
              <option>Status 2</option>
            </Select>
            {formik.touched.status && formik.errors.status ? (
              <div className="text-xs text-red-600 dark:text-red-400">
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
  );
};

export default TaskCreatePage;