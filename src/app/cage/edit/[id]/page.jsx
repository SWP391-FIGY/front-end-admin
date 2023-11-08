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
import { useParams } from "next/navigation";
import useAxios from "@/hooks/useFetch";

const { default: PageLayout } = require("@/layout/pageLayout")

const CageEditPage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false)
  const params = useParams();
  const uid = params.id;
  const cageId = parseInt(params.id, 10);
 
  // Fetch old cage data
  const {
    response: cageResponse,
    loading: cageLoading,
    error: cageError,
  } = useAxios({
    method: "get",
    url: `${API}/cage/?filter=ID%20eq%20${cageId}`,
  });

  // Fetch old data to form
  useEffect(() => {
    if (cageResponse) {
      console.log(cageResponse);
      formik.setValues({
        ...cageResponse[0],
      });
    }
  }, [cageResponse]);

  const formik = useFormik({
    initialValues: {
      size: '',
      color: '',
      area: 'keep in cool places',
      type: 'kg',
      cageStatus: '',
      capacity: '',
    },
    validationSchema: Yup.object({
      size: Yup.string().required('Required'),
      color: Yup.string().required('Required'),
      area: Yup.string().required('Required'),
      type: Yup.string().required('Required'),
      cageStatus: Yup.number().required('Required'),
      capacity: Yup.number().required('Required'),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log('submit data',payloadData.data);
      axios
        .put(`${API}/cage/${cageId}`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();
          message.success("Update cage success");
          router.push("/cage/index");
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
          <Link href={'/cage/index'} className="flex flex-row gap-2">{<HiOutlineArrowSmallLeft className="self-center" />} Back to list</Link>
          <h2 className='text-3xl font-bold'>Edit Cage</h2>

        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="size"
              value="Size"
            />
            <TextInput
              id="size"

              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.size}
            />
            {formik.touched.size && formik.errors.size ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.size}
              </div>
            ) : null}
          </div>
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
              htmlFor="area"
              value="Area"
            />
            <Select
              id="area"

              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.area}
            >
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
              <option>E</option>

            </Select>
            {formik.touched.area && formik.errors.area ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.area}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="type"
              value="Type"
            />
            <TextInput
              id="type"

              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.type}
            />
            {formik.touched.type && formik.errors.type ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.type}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="cageStatus"
              value="Cage status"
            />
            <Select
              id="cageStatus"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cageStatus}
            >
              <option value="1">In use</option>
              <option value="2">Maintenance</option>
              <option value="3">Broken</option>
              <option value="4">Not in use</option>

            </Select>
            {formik.touched.cageStatus && formik.errors.cageStatus ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.cageStatus}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="capacity"
              value="Capacity"
            />
            <TextInput
              id="capacity"

              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.capacity}
            />
            {formik.touched.capacity && formik.errors.capacity ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.capacity}
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

export default CageEditPage