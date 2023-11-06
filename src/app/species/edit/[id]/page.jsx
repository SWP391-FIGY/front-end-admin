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

const SpeciesEditPage = () => {
  const [spinner, setSpinner] = useState(false)
  const params = useParams();
  const router = useRouter();
  const speciesId = parseInt(params.id, 10);

  // Fetch old species data
  const {
    response: speciesResponse,
    loading: speciesLoading,
    error: speciesError,
  } = useAxios({
    method: "get",
    url: `${API}/species/?filter=ID%20eq%20${speciesId}&$select=*`,
  });

  
  // Fetch old data to form
  useEffect(() => {
    if (speciesResponse) {
      console.log(speciesResponse);
      formik.setValues({
        ...speciesResponse[0],
      });
    }
  }, [speciesResponse]);

  
  const urlRegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
  const formik = useFormik({
    initialValues: {
      id: speciesId,
      name:'',
      color: '',
      size: '',
      voice: '',
      imageLink: '',
      lifeExpectancy: '',
      habitat: '',
      
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      color: Yup.string().required('Required'),
      size: Yup.string().required('Required'),
      voice: Yup.string().matches(urlRegExp, 'Voice link is not valid').required('Required'),
      imageLink: Yup.string().matches(urlRegExp, 'Image link is not valid').required('Required'),
      lifeExpectancy: Yup.number().lessThan(100, 'LifeExpectancy must be lower than 100').positive('LifeExpectancy must be higher than 0').integer('LifeExpectancy must be an integer').required('Required'),
      habitat: Yup.string().required('Required'),
      
    }),
    onSubmit: values => {
      setSpinner(true)
      const payloadData = {
        data: values,
      }
      console.log('submit data',payloadData.data);
      axios
        .put(`${API}/species/${speciesId}`, payloadData.data)
        .then(response => {
          setSpinner(false);
          formik.resetForm();
          message.success("Update species success");
          router.push("/species/index");
        })
        .then((response) => {
          message.success("Update species success");
        })
        .catch((error) => {
          message.error("An error occurred");
          setSpinner(false);
          console.log("An error occurred:", error.response);
        });
    },
  })

  
  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col justify-between gap-4">
          <Link href={"/species/index"} className="flex flex-row gap-2">
            {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
          </Link>
          <h2 className="text-3xl font-bold">Edit Species</h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]">

          {/* // * Species Name */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="name"
              value="Species Name"
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

          {/* // * Species Color */}
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

          {/* // * Species Size */}
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

          {/* //* Species Voice */}
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="voice" 
            value="Voice" />
            <TextInput
              id="voice"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.voice}
            />
            {formik.touched.voice && formik.errors.voice ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.voice}
              </div>
            ) : null}
          </div>

          {/* //* Image Link */}  
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

          {/* //* LifeExpectancy */} 
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="lifeExpectancy"
              value="Life Expectancy"
            />
            <TextInput
              id="lifeExpectancy"

              type="number"
              min={0}
              max={100}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lifeExpectancy}
            />
            {formik.touched.lifeExpectancy && formik.errors.lifeExpectancy ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.lifeExpectancy}
              </div>
            ) : null}
          </div>

          {/* //* Species Habitat */} 
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

export default SpeciesEditPage
