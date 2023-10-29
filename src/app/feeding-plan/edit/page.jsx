'use client'
import { Button, Label, Select, TextInput, Spinner, Datepicker } from "flowbite-react"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"
import Link from "next/link"
import { HiOutlineArrowSmallLeft, HiPlus } from "react-icons/hi2"

const { default: PageLayout } = require("@/layout/pageLayout")

const PlanEditPage = () => {
  const [spinner, setSpinner] = useState(false)
  const params = useParams();
  const uid = params.id;

  console.log('editing id',uid);

  const formik = useFormik({
    initialValues: {
      menuId: 1,
      birdId: 1,
      dateAndTime: "",
      feedingStatus: "",
      notation: "",
    },
    validationSchema: Yup.object({
      menuId: Yup.number().required("Required"),
      birdId: Yup.number().required("Required"),
      dateAndTime: Yup.date().min(new Date().toLocaleDateString(), "Birth date must after today").required("Required"),
      feedingStatus: Yup.number().required("Required"),
      notation: Yup.string().required("Required")
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
          <h2 className='text-3xl font-bold'>Update feeding plan</h2>

        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]">

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="menuId"
              value="Menu ID"
            />
            <Select
              id="menuId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.menuId}
            >
                  <option value={1}>Menu 1</option>
                  <option value={2}>Menu 2</option>
                  <option value={3}>Menu 3</option>
            </Select>
            {formik.touched.menuId && formik.errors.menuId ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.menuId}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="birdId" value="Bird ID" />
            <div className="flex w-full gap-2">
              <div className="w-[500px]">
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
              </div>
              <Link href={{pathname:"/birds/create", query: {...formik.values, 'bird-add':true}}}>
                <Button>
                  <div className="flex flex-row justify-center gap-2">
                    <div className="my-auto">
                      <HiPlus />
                    </div>
                    <p>Add new bird</p>
                  </div>
                </Button>
              </Link>
            </div>
            {formik.touched.birdId && formik.errors.birdId ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.birdId}
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
            <Label htmlFor="feedingStatus" value="Feeding status" />
            <Select
              id="feedingStatus"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.feedingStatus}
            >
              <option>Status 1</option>
              <option>Status 2</option>
            </Select>
            {formik.touched.feedingStatus && formik.errors.feedingStatus ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.feedingStatus}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="notation" value="Notation" />
            <TextInput
              id="notation"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.notation}
            />
            {formik.touched.notation && formik.errors.notation ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.notation}
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

export default PlanEditPage;