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
import { DatePicker, Space, message } from "antd";
import { HiPlus } from "react-icons/hi";
import moment from "moment/moment";
import axios from "axios";
import { API } from "@/constants";
import useAxios from "@/hooks/useFetch";
import { useParams } from "next/navigation";

const { default: PageLayout } = require("@/layout/pageLayout");

const LogCreatePage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const params = useParams();
  const logId = parseInt(params.id, 10);

      //Fetch old task data
  const {
    response: logResponse,
    loading: logLoading,
    error: logError,
  } = useAxios({
    method: "get",
    url: `${API}/log/?filter=ID%20eq%20${logId}&select=*`,
  });
 
  //Fetch old data to form
  useEffect(() => {
    if (logResponse) {
      console.log(logResponse);
      formik.setValues({
        ...logResponse[0],
      });
    }
  }, [logResponse]);

    // Get bird list
    const {
      response: birdResponse,
      loading: birdLoading,
      error: birdError,
    } = useAxios({
      method: "get",
      url: `${API}/bird/`,
    });
    // Get cage list
    const {
      response: cageResponse,
      loading: cageLoading,
      error: cageError,
    } = useAxios({
      method: "get",
      url: `${API}/cage/`,
    });

  const formik = useFormik({
    initialValues: {
      BirdId: 1,
      CageId: 1,
      Date: moment(new Date()),
      Description: "",
    },
    validationSchema: Yup.object({
      BirdId: Yup.number().required("Required"),
      CageId: Yup.number().required("Required"),
      DateTime: Yup.date()
        .max(new Date(), "Date must be today or before")
        .required("Required"),      
      Description: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
        setSpinner(true);
        const payloadData = {
          data: values,
        };
        console.log('submit data',payloadData.data);
        axios
          .put(`${API}/log/${logId}`, payloadData.data)
          .then((response) => {
            setSpinner(false);
            formik.resetForm();
            message.success("Update bird log success");
            router.push("/bird-log/index");
          })
          .catch((error) => {
            message.error("An error occurred");
            setSpinner(false);
            console.log("An error occurred:", error);
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
          <Link href={"/bird-log/index"} className="flex flex-row gap-2">
            {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
          </Link>
          <h2 className="text-3xl font-bold">Add new bird log</h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]"
        >
          {/* //* Bird  */}
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="BirdId" value="Bird" />
            <div className="flex w-full gap-2">
              <div className="w-[500px]">
              <Select
                  id="BirdId"
                  onChange={(e) => {
                    const stringSelection = e.target.value
                    formik.setFieldValue("BirdId", parseInt(stringSelection));
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.BirdId}
                >
                  {birdResponse && birdResponse.length > 0 ? (
                    birdResponse.map((bird, index) => {
                      return (
                        <option key={index} value={bird.id}>
                          Bird {bird.id}
                        </option>
                      );
                    })
                  ) : (
                    <option disabled>Loading...</option>
                  )}
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

            {formik.touched.BirdId && formik.errors.BirdId ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.BirdId}
              </div>
            ) : null}
          </div>

          {/* // * Bird cage */}
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="CageId" value="Bird cage" />
            <div className="flex w-full gap-2">
              <div className="w-[500px]">
                <Select
                  id="CageID"
                  onChange={(e) => {
                    const stringSelection = e.target.value
                    formik.setFieldValue("CageID", parseInt(stringSelection));
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.CageID}
                >
                  {cageResponse && cageResponse.length > 0 ? (
                    cageResponse.map((cage, index) => {
                      return (
                        <option key={index} value={cage.id}>
                          Cage {cage.id}
                        </option>
                      );
                    })
                  ) : (
                    <option disabled>Loading...</option>
                  )}
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

          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="Date" value="Date" />            
            <Space direction="vertical" size={12}>
              <DatePicker
                className="!important"
                showTime
                minuteStep={30}
                secondStep={60}
                autoClose
                onSelect={(value) => {
                  formik.setFieldValue("Date", value.$d);
                }}
              />
            </Space>
            {formik.touched.Date && formik.errors.Date ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.Date}
              </div>
            ) : null}
          </div>

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

          <Button type="submit">
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

export default LogCreatePage;
