'use client'
import { Button, Label, Select, TextInput, Datepicker, Spinner } from "flowbite-react"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { usePathname } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { HiOutlineArrowSmallLeft } from "react-icons/hi2"

const { default: PageLayout } = require("@/layout/pageLayout")

const FoodCreatePage = () => {
  const [spinner, setSpinner] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      nutritionalIngredients: '',
      storageConditions: 'keep in cool places',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      nutritionalIngredients: Yup.string().required('Required'),
      storageConditions: Yup.string().required('Required'),
    }),
    onSubmit: values => {
      setSpinner(true)
      const payloadData = {
        data: values,
      }
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
        })
    },
  })

  return (
    <PageLayout>
      <div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
      <div className='flex flex-col justify-between gap-4'>
          <Link href={'/foods/index'} className="flex flex-row gap-2">{<HiOutlineArrowSmallLeft className="self-center" />} Back to list</Link>
          <h2 className='text-3xl font-bold'>Add new food</h2>

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
              htmlFor="storageConditions"
              value="Storage conditions"
            />
            <Select
              id="storageConditions"

              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.storageConditions}
            >
              <option>keep in cool places</option>
              <option>refrigerated</option>

            </Select>
            {formik.touched.storageConditions && formik.errors.storageConditions ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.storageConditions}
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