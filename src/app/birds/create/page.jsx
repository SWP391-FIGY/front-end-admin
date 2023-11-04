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

const { default: PageLayout } = require("@/layout/pageLayout");

const BirdCreatePage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
 
  console.log(moment(new Date()).format('DD/MM/YYYY'));
  const formik = useFormik({
    initialValues: {
      Description: "",
      SpeciesId: 1,
      CageId: 1,
      DoB: moment(new Date()).format('DD/MM/YYYY'),
      LastModifyDate: moment(new Date()).format('DD/MM/YYYY'),
      Gender: "Male",
      Status: "Status 1",
    },
    validationSchema: Yup.object({
      Description: Yup.string().required("Required"),
      SpeciesId: Yup.number().required("Required"),
      CageId: Yup.number().required("Required"),
      DoB: Yup.date()
        .max(new Date().toLocaleDateString(), "Birth date must before today")
        .required("Required"),
      LastModifyDate: Yup.date().required("Required"),
      Gender: Yup.string().required("Required"),
      Status: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log(payloadData.data);
      axios
        .post(`${API}/bird`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();
          
          router.push("/birds/index")
        })
        .then((response) => {
          message.success("Add new bird success");
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
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col justify-between gap-4">
          <Link href={"/birds/index"} className="flex flex-row gap-2">
            {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
          </Link>
          <h2 className="text-3xl font-bold">Add new Birds</h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-full"
        >

          {/* // * Bird birthDate */}
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="DoB" value="Birthdate" />
            <Datepicker
              id="DoB"
              language="vi-VN"
              value={moment(formik.values.birthdate).format('DD/MM/YYYY')}
              onSelectedDateChanged={(date) => {
                console.log(new Date(date));
                formik.setFieldValue("DoB", date);
                console.log("value", formik.values);
                console.log("errors", formik.errors);
              }}
              onBlur={formik.handleBlur}
              onSelect={(e) => {
                console.log(e);
              }}
            />
            {formik.touched.DoB && formik.errors.DoB ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.DoB}
              </div>
            ) : null}
          </div>
          
          {/* // * Bird gender */}
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="Gender" value="Bird gender" />
            <Select
              id="Gender"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Gender}
            >
              <option>Male</option>
              <option>Female</option>
            </Select>
            {formik.touched.Gender && formik.errors.Gender ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.Gender}
              </div>
            ) : null}
          </div>

          {/* //* Bird Description */}
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

          {/* //* Bird image */}
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="BirdImageUrl" value="Bird Image URL" />
            <TextInput
              id="BirdImageUrl"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.BirdImageUrl}
            />
            {formik.touched.BirdImageUrl && formik.errors.BirdImageUrl ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.BirdImageUrl}
              </div>
            ) : null}
          </div>

          {/* // * Bird status */}
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="Status" value="Bird status" />
            <Select
              id="Status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Status}
            >
              <option>Status 1</option>
              <option>Status 2</option>
            </Select>
            {formik.touched.Status && formik.errors.Status ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.Status}
              </div>
            ) : null}
          </div>

          {/* //* Bird species */}
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="SpeciesId" value="Bird species" />
            <div className="flex w-full gap-2">
              <div className="w-[500px]">
                <Select
                  id="SpeciesId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.SpeciesId}
                >
                  <option value={1}>Species 1</option>
                  <option value={2}>Species 2</option>
                  <option value={3}>Species 3</option>
                </Select>
              </div>
              <Link href={"/species/create?bird-add=true"}>
                <Button>
                  <div className="flex flex-row justify-center gap-2">
                    <div className="my-auto">
                      <HiPlus />
                    </div>
                    <p>Add new species</p>
                  </div>
                </Button>
              </Link>
            </div>

            {formik.touched.speciesId && formik.errors.speciesId ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.speciesId}
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

export default BirdCreatePage;
