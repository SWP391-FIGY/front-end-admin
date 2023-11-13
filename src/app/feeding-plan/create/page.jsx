"use client";
import {
  Button,
  Label,
  Select,
  TextInput,
  Spinner,
  Datepicker,
} from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowSmallLeft, HiPlus } from "react-icons/hi2";
import { message } from "antd";
import moment from "moment/moment";
import axios from "axios";
import { API } from "@/constants";
import useAxios from "@/hooks/useFetch";

const { default: PageLayout } = require("@/layout/pageLayout");

// TODO: Show menu detail when selected
const PlanCreatePage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);

  // Get Meal Menu list
  const {
    response: mealMenuResponse,
    loading: mealMenuLoading,
    error: mealMenuError,
  } = useAxios({
    method: "get",
    url: `${API}/MealMenu/?expand=menuDetails($expand=food)`,
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

  const formik = useFormik({
    initialValues: {
      MealMenuID: 1,
      BirdID: 1,
      Description: "",
      DateTime: new Date(),
      FeedingStatus: "",
    },
    validationSchema: Yup.object({
      MealMenuID: Yup.number().required("Required"),
      BirdID: Yup.number().required("Required"),
      Description: Yup.string().required("Required"),
      DateTime: Yup.date()
        .min(new Date().toLocaleDateString(), "The date must after today")
        .required("Required"),
      FeedingStatus: Yup.string(),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log("Submitted");
      console.log(payloadData.data);
      axios
        .post(`${API}/feedingPlan`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();
          router.push("/feeding-plan/index");
        })
        .then((response) => {
          message.success("Add new feeding plan success");
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
          <Link href={"/feeding-plan/index"} className="flex flex-row gap-2">
            {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
          </Link>
          <h2 className="text-3xl font-bold">Add new feeding plan</h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]"
        >
          {/* //* Plan Menu */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="MealMenuID" value="Menu ID" />
            <div className="flex w-full gap-2">
              <div className="w-[500px]">
                <Select
                  id="MealMenuID"
                  onChange={(e) => {
                    const stringSelection = e.target.value;
                    formik.setFieldValue("MealMenuID", parseInt(stringSelection));
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.MealMenuID}
                >
                  {mealMenuResponse && mealMenuResponse.length > 0 ? (
                    mealMenuResponse.map((mealMenu, index) => {
                      return (
                        <option key={index} value={mealMenu.ID}>
                          {mealMenu.MenuName}
                        </option>
                      );
                    })
                  ) : (
                    <option disabled>Loading...</option>
                  )}
                </Select>
              </div>
              <Link
                href={{
                  pathname: "/menu/create",
                  query: { ...formik.values, "bird-add": true },
                }}
              >
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
            {formik.touched.MealMenuID && formik.errors.MealMenuID ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.MealMenuID}
              </div>
            ) : null}
          </div>
          {/* //* Plan Bird Id */}
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="BirdID" value="Bird ID" />

            <div className="flex w-full gap-2">
              <div className="w-[500px]">
                <Select
                  id="BirdID"
                  onChange={(e) => {
                    const stringSelection = e.target.value;
                    formik.setFieldValue("BirdID", parseInt(stringSelection));
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.BirdID}
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
              <Link
                href={{
                  pathname: "/birds/create",
                  query: { ...formik.values, "bird-add": true },
                }}
              >
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
            {formik.touched.BirdID && formik.errors.BirdID ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.BirdID}
              </div>
            ) : null}
          </div>
          {/* //* Plan Date Time */}
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="DateTime" value="Date and Time" />
            <Datepicker
              id="DateTime"
              selected={formik.values.DateTime}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd/MM/yyyy HH:mm"
              onSelectedDateChanged={(date) => {
                console.log(new Date(date));
                formik.setFieldValue("DateTime", date);
                console.log("value", formik.values);
                console.log("errors", formik.errors);
              }}
              onBlur={formik.handleBlur}
              onSelect={(e) => {
                console.log(e);
              }}
            />
            {formik.touched.DateTime && formik.errors.DateTime ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.DateTime}
              </div>
            ) : null}
          </div>
          {/* // * Plan status */}
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="FeedingStatus" value="Feeding status" />
            <Select
              id="FeedingStatus"
              onChange={(e) => {
                const stringSelection = e.target.value;
                formik.setFieldValue(
                  "FeedingStatus",
                  stringSelection
                );
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

export default PlanCreatePage;
