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
import { HiPlus } from "react-icons/hi";
import moment from "moment/moment";

const { default: PageLayout } = require("@/layout/pageLayout");

const BirdCreatePage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
 
  console.log(moment(new Date()).format('DD/MM/YYYY'));
  const formik = useFormik({
    initialValues: {
      name: "",
      speciesId: 1,
      cageId: 1,
      birthdate: moment(new Date()).format('DD/MM/YYYY'),
      gender: "Male",
      status: "Status 1",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      speciesId: Yup.number().required("Required"),
      cageId: Yup.number().required("Required"),
      birthdate: Yup.date()
        .max(new Date().toLocaleDateString(), "Birth date must before today")
        .required("Required"),
      gender: Yup.string().required("Required"),
      status: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log("Submitted");
      console.log(payloadData);
      // axios
      //   .post(`${API}/feedbacks`, payloadData)
      //   .then(response => {
      //     setSpinner(false)
      //     formik.resetForm()
      //   })
      //   .catch(error => {
      //     setSpinner(false)
      //     console.log('An error occurred:', error.response)
      //   })

      router.push("create/meal-info");
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
          {/* //* Bird name */}
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="name" value="Bird name" />
            <TextInput
              id="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.name}
              </div>
            ) : null}
          </div>
          {/* //* Bird species */}
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="speciesId" value="Bird species" />
            <div className="flex w-full gap-2">
              <div className="w-[500px]">
                <Select
                  id="speciesId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.speciesId}
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
            {formik.touched.cageId && formik.errors.cageId ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.cageId}
              </div>
            ) : null}
          </div>
          {/* // * Bird birthDate */}
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="birthDate" value="Birth Date" />
            <Datepicker
              id="birthDate"
              language="vi-VN"
              value={moment(formik.values.birthdate).format('DD/MM/YYYY')}
              onSelectedDateChanged={(date) => {
                console.log(new Date(date));
                formik.setFieldValue("birthdate", date);
                console.log("value", formik.values);
                console.log("errors", formik.errors);
              }}
              onBlur={formik.handleBlur}
              onSelect={(e) => {
                console.log(e);
              }}
            />
            {formik.touched.birthdate && formik.errors.birthdate ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.birthdate}
              </div>
            ) : null}
          </div>
          {/* // * Bird gender */}
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="gender" value="Bird gender" />
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
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.gender}
              </div>
            ) : null}
          </div>
          {/* // * Bird status */}
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="status" value="Bird status" />
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
