'use client'
import { Button, Label, Select, TextInput, Datepicker, Spinner } from "flowbite-react"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { usePathname } from "next/navigation"
import { useState } from "react"

const { default: PageLayout } = require("@/layout/pageLayout")

const UserCreatePage = () => {
  const [spinner, setSpinner] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
      role: 'Bird Carer',
      status: 'Status 1',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
      phoneNumber: Yup.number().required('Required'),
      role: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
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
          <h2 className='text-3xl font-bold'>Add new user</h2>

        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="name"
              value="User name"
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
              htmlFor="email"
              value="Email"
            />
            <TextInput
              id="email"

              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="password"
              value="Password"
            />
            <TextInput
              id="password"

              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="phoneNumber"
              value="Phone number"
            />
            <TextInput
              id="phoneNumber"

              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.phoneNumber}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="role"
              value="User Role"
            />
            <Select
              id="role"

              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
            >
              <option>Bird Carer</option>
              <option>Admin</option>

            </Select>
            {formik.touched.role && formik.errors.role ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.role}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="status"
              value="User status"
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

export default UserCreatePage