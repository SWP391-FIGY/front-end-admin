'use client'
import { Button, Label, Select, TextInput, Datepicker, Spinner } from "flowbite-react"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2'

const { default: PageLayout } = require("@/layout/pageLayout")

const BirdEditPage = () => {
  const [spinner, setSpinner] = useState(false)
  const params = useParams();
  const uid = params.id;

  console.log('detail id',uid);

  const formik = useFormik({
    initialValues: {
      name: '',
      species: 'Species 2',
      birthdate: '',
      gender: 'Male',
      status: 'Status 1',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      species: Yup.string().required('Required'),
      birthdate: Yup.date().max(new Date().toLocaleDateString(), 'Birth date must before today').required('Required'),
      gender: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
    }),
    onSubmit: values => {
      setSpinner(true)
      const payloadData = {
        data: values,
      }
      console.log("Submitted");
      axios
        .post(`${API}/feedbacks`, payloadData)
        .then(response => {
          setSpinner(false)
          formik.resetForm()
        })
        .catch(error => {
          setSpinner(false)
          console.log('An error occurred:', error.response)
        })
    },
  })

  useEffect(() => {
    console.log(formik)
  }, [formik])
  return (
    <PageLayout>
      <div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
        <div className='flex flex-col justify-between gap-4'>
          <Link href={'/birds/index'} className="flex flex-row gap-2">{<HiOutlineArrowSmallLeft className="self-center" />} Back to list</Link>
          <h2 className='text-3xl font-bold'>Bird Details</h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="name"
              value="Bird name"
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
              htmlFor="species"
              value="Bird species"
            />
            <Select
              id="species"

              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.species}
            >
              <option>Species 1</option>
              <option>Species 2</option>
              <option>Species 3</option>
            </Select>
            {formik.touched.species && formik.errors.species ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.species}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="birthDate"
              value="Birth Date"
            />
            <Datepicker id="birthDate"
              language="vi-VN"
              onSelectedDateChanged={(date) => {
                console.log(new Date(date));
                formik.setFieldValue("birthdate", date)
                console.log('value', formik.values)
                console.log('errors', formik.errors)
              }}
              onBlur={formik.handleBlur}
              onSelect={(e) => { console.log(e); }}
            />
            {formik.errors.birthdate ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.birthdate}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="gender"
              value="Bird gender"
            />
            <Select
              id="gender"

              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.gender}
            >
              <option>Male</option>
              <option>Female</option>
            </Select>
            {formik.touched.gender && formik.errors.gender ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.gender}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="status"
              value="Bird status"
            />
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

export default BirdEditPage