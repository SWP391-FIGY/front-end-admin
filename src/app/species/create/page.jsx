'use client'
import { Button, Label, Select, TextInput, Datepicker, Spinner } from "flowbite-react"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { usePathname } from "next/navigation"
import { useState } from "react"

const { default: PageLayout } = require("@/layout/pageLayout")

const SpeciesCreatePage = () => {
  const [spinner, setSpinner] = useState(false)

  const formik = useFormik({
    initialValues: {
      color: '',
      size: 'small',
      voice: 'clear',
      imageLink: '',
      age: '',
      habitat: '',
      total: '',
    },
    validationSchema: Yup.object({
      color: Yup.string().required('Required'),
      size: Yup.string().required('Required'),
      voice: Yup.string().required('Required'),
      imageLink: Yup.string().required('Required'),
      age: Yup.number().required('Required'),
      habitat: Yup.string().required('Required'),
      total: Yup.number().required('Required'),
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
        <div className='flex flex-row justify-between'>
          <h2 className='text-3xl font-bold'>Add new species</h2>

        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="color"
              value="Color"
            />
            <TextInput
              id="color"

              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.color}
            />
            {formik.touched.color && formik.errors.color ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.color}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="size"
              value="Size"
            />
            <Select
              id="size"

              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.size}
            >
              <option>small</option>
              <option>medium</option>
              <option>big</option>

            </Select>
            {formik.touched.size && formik.errors.size ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.size}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="voice"
              value="Voice"
            />
            <Select
              id="voice"

              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.voice}
            >
              <option>clear</option>
              <option>hoarse</option>
              <option>mute</option>

            </Select>
            {formik.touched.voice && formik.errors.voice ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.voice}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="imageLink"
              value="Image"
            />
            <TextInput
              id="imageLink"

              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.imageLink}
            />
            {formik.touched.imageLink && formik.errors.imageLink ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.imageLink}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="age"
              value="Age"
            />
            <TextInput
              id="age"

              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
            />
            {formik.touched.age && formik.errors.age ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.age}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="babitat"
              value="Habitat"
            />
            <TextInput
              id="habitat"

              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.habitat}
            />
            {formik.touched.habitat && formik.errors.habitat ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.habitat}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="total"
              value="Total"
            />
            <TextInput
              id="total"

              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.total}
            />
            {formik.touched.total && formik.errors.total ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.total}
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

export default SpeciesCreatePage