'use client'
import { Button, Label, Select, TextInput, Spinner, Datepicker } from "flowbite-react"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"
import Link from "next/link"
import { HiOutlineArrowSmallLeft, HiPlus } from "react-icons/hi2"
import { message } from "antd";
import { HiPlus } from "react-icons/hi";
import moment from "moment/moment";
import axios from "axios";
import { API } from "@/constants";
import { useParams } from "next/navigation";
import useAxios from "@/hooks/useFetch";


const { default: PageLayout } = require("@/layout/pageLayout")

const PlanEditPage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false)
  const params = useParams();
  const planId = parseInt(params.id, 10);

  // Fetch old Feeding Plan data
  const {
    response: planResponse,
    loading: planLoading,
    error: planError,
  } = useAxios({
    method: "get",
    url: `${API}/FeedingPlan/?filter=ID%20eq%20${planId}&$select=*`,
  });


  // Get Meal Menu list
  const {
    response: mealMenuResponse,
    loading: mealMenuLoading,
    error: mealMenuError,
  } = useAxios({
    method: "get",
    url: `${API}/MealMenu/`,
  });
  // Get bird list
  const {
    response: birdResponse,
    loading: birdLoading,
    error: birdError,
  } = useAxios({
    method: "get",
    url: `${API}/bird/`,
  });

  // Fetch old data to form
  useEffect(() => {
    if (planResponse) {
      console.log(planResponse);
      formik.setValues({
        ...planResponse[0],
      });
    }
  }, [planResponse]);





  const formik = useFormik({
    initialValues: {
      Id: planId,
      MenuId: 1,
      BirdId: 1,
      Description: "",
      DateAndTime: "",
      FeedingStatus: 1,

    },
    validationSchema: Yup.object({
      MenuId: Yup.number().required("Required"),
      BirdId: Yup.number().required("Required"),
      Description: Yup.string().required("Required"),
      DateAndTime: Yup.date().min(new Date().toLocaleDateString(), "The date must after today").required("Required"),
      FeedingStatus: Yup.number().required("Required"),

    }),
    onSubmit: values => {
      setSpinner(true)
      const payloadData = {
        data: values,
      };
      console.log("Submitted", payloadData.data);

      axios
        .put(`${API}/feedingPlan/${planId}`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();
          message.success("Update Feeding Plan success");
          router.push("/feeding-plan/index");
        })
        .then((response) => {
          message.success("Update Feeding Plan success");
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
      <div className='w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll'>
        <div className='flex flex-col justify-between gap-4'>
          <Link href={'/feeding-plan/index'} className="flex flex-row gap-2">{<HiOutlineArrowSmallLeft className="self-center" />} Back to list</Link>
          <h2 className='text-3xl font-bold'>Update feeding plan</h2>

        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]">

          {/* //* Plan Menu */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="MenuId"
              value="Menu for Bird"
            />
            <div className="flex w-full gap-2">
              <div className="w-[500px]">

                <Select
                  id="MenuId"
                  onChange={(e) => {
                    const stringSelection = e.target.value
                    formik.setFieldValue("MenuId", parseInt(stringSelection));
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.MenuId}
                >
                  {mealMenuResponse && mealMenuResponse.length > 0 ? (
                    mealMenuResponse.map((mealMenu, index) => {
                      return (
                        <option key={index} value={mealMenu.id}>
                          {mealMenu.menuName}
                        </option>
                      );
                    })
                  ) : (
                    <option disabled>Loading...</option>
                  )}
                </Select>
              </div>
              <Link href={{ pathname: "/menu/create", query: { ...formik.values, 'bird-add': true } }}>
                <Button>
                  <div className="flex flex-row justify-center gap-2">
                    <div className="my-auto">
                      <HiPlus />
                    </div>
                    <p>Add new Menu</p>
                  </div>
                </Button>
              </Link>
            </div>
            {formik.touched.MenuId && formik.errors.MenuId ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.MenuId}
              </div>
            ) : null}
          </div>

          {/* //* Plan Bird Id */}
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="BirdId" value="Bird ID" />

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
                          {bird.id}
                        </option>
                      );
                    })
                  ) : (
                    <option disabled>Loading...</option>
                  )}
                </Select>
              </div>
              <Link href={{ pathname: "/birds/create", query: { ...formik.values, 'bird-add': true } }}>
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
          {/* //* Plan Date Time */}
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="dateAndTime" value="Date and Time" />
            <Datepicker
              id="dateAndTime"
              selected={formik.values.dateAndTime}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd/MM/yyyy HH:mm"
              onSelectedDateChanged={(date) => {
                console.log(new Date(date));
                formik.setFieldValue("dateAndTime", date);
                console.log("value", formik.values);
                console.log("errors", formik.errors);
              }}
              onBlur={formik.handleBlur}
              
            />
            {formik.touched.dateAndTime && formik.errors.dateAndTime ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.dateAndTime}
              </div>
            ) : null}
          </div>
          {/* // * Plan status */}
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="FeedingStatus" value="Feeding status" />
            <Select
              id="FeedingStatus"
              onChange={(e) => {
                const stringSelection = e.target.value
                formik.setFieldValue("FeedingStatus", parseInt(stringSelection));
              }}
              onBlur={formik.handleBlur}
              value={formik.values.FeedingStatus}
            >
              <option value={1}>Upcoming</option>
              <option value={2}>Ongoing</option>
              <option value={3}>Fed</option>
              <option value={4}>Overdue</option>
              <option value={5}>Other</option>
            </Select>
            {formik.touched.FeedingStatus && formik.errors.FeedingStatus ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.FeedingStatus}
              </div>
            ) : null}
          </div>
          {/* //* Plan Description */}
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
              <div className='flex justify-center items-center gap-4'>
                <Spinner aria-label='Spinner button example' />
                <p>Loading...</p>
              </div>
            ) : (
              <>Submit</>
            )}
          </Button>
        </form>
      </div >
    </PageLayout >
  );
};

export default PlanEditPage;