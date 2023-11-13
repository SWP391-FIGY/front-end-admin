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
import axios from "axios";
import { API } from "@/constants";
import { useParams } from "next/navigation";
import useAxios from "@/hooks/useFetch";
import { DatePicker, Space, message } from "antd";

const { default: PageLayout } = require("@/layout/pageLayout");

const TaskEditPage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const params = useParams();
  const taskId = parseInt(params.id, 10);

  //Fetch old task data
  const {
    response: taskResponse,
    loading: taskLoading,
    error: taskError,
  } = useAxios({
    method: "get",
    url: `${API}/task/?filter=ID%20eq%20${taskId}&select=*`,
  });

  //Fetch old data to form
  useEffect(() => {
    if (taskResponse) {
      console.log(taskResponse);
      formik.setValues({
        ...taskResponse[0],
      });
      formik.setFieldTouched("CageId");
      formik.setFieldTouched("StaffId");
    }
  }, [taskResponse]);

  //Get user data
  const {
    response: staffResponse,
    loading: staffLoading,
    error: staffError,
  } = useAxios({
    method: "get",
    url: `${API}/user/?filter=role ne 0`,
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
      Id: taskId,
      BirdId: 1,
      CageId: 1,
      StaffId: 1,
      TaskName: "",
      DateTime: moment(new Date()),
      Description: "",
      Status: "Pending",
    },
    validationSchema: Yup.object({
      CageId: Yup.number(),
      StaffId: Yup.number(),
      TaskName: Yup.string().required("Required"),
      DateTime: Yup.date()
        .min(new Date(), "Date must be today or later")
        .required("Required"),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log("submit data", payloadData.data);
      axios
        .put(`${API}/task/${taskId}`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();
          message.success("Update task success");
          router.push("/tasks/index");
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
          <Link href={"/tasks/index"} className="flex flex-row gap-2">
            {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
          </Link>
          <h2 className="text-3xl font-bold">Edit task</h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]"
        >
        <Label value="Task ID" />
        <div>{formik.values.Id}</div>
          {/* //* Bird  */}
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="BirdId" value="Bird" />
            <div className="flex w-full gap-2">
              <div className="w-[500px]">
                <Select
                  id="BirdId"
                  onChange={(e) => {
                    const stringSelection = e.target.value;
                    formik.setFieldValue("BirdId", parseInt(stringSelection));
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.BirdId}
                >
                  {birdResponse && birdResponse.length > 0 && (
                    <option value={null}>None</option>
                  )}
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
                    const stringSelection = e.target.value;
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
            </div>
            {formik.touched.CageId && formik.errors.CageId ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.CageId}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="StaffId" value="Staff" />
            <Select
              id="StaffId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.StaffId}
            >
              {staffResponse && staffResponse.length > 0 ? (
                staffResponse.map((staff, index) => {
                  return (
                    <option key={index} value={staff.id}>
                      Staff {staff.name}
                    </option>
                  );
                })
              ) : (
                <option disabled>Loading...</option>
              )}
            </Select>
            {formik.touched.StaffId && formik.errors.StaffId ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.StaffId}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="TaskName" value="Task name" />
            <TextInput
              id="TaskName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.TaskName}
            />
            {formik.touched.TaskName && formik.errors.TaskName ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.TaskName}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="DateTime" value="Date and Time" />
            <Space direction="vertical" size={12}>
              <DatePicker
                className="!important"
                showTime
                minuteStep={30}
                secondStep={60}
                autoClose
                onSelect={(value) => {
                  formik.setFieldValue("DateTime", value.$d);
                }}
              />
            </Space>
            {formik.touched.DateTime && formik.errors.DateTime ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.DateTime}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
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

          <div className="flex flex-col gap-2">
            <Label htmlFor="Status" value="Task Status" />
            <Select
              id="Status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Status}
            >
              <option>Done</option>
              <option>Pending</option>
              <option>Ongoing</option>
              <option>Overdue</option>
              <option>Upcoming</option>
              <option>Not Assigned</option>
            </Select>
            {formik.touched.Status && formik.errors.Status ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.Status}
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

export default TaskEditPage;
