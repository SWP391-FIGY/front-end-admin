"use client";
import { API } from "@/constants";
import useAxios from "@/hooks/useFetch";
import PageLayout from "@/layout/pageLayout";
import { message } from "antd";
import axios from "axios";
import { Button, Label, Select, Spinner, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import * as Yup from "yup";

const InventoryReportCreatePage = () => {
  const params = useParams();
  const foodId = parseInt(params.id, 10);
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);

  // Food info
  const {
    response: foodResponse,
    loading,
    error,
  } = useAxios({
    method: "get",
    url: `${API}/food/?filter=ID%20eq%20${foodId}`,
  });

  const [foodData, setFoodData] = useState([])

  useEffect(() => {
    if (foodResponse && foodResponse[0])
    setFoodData(foodResponse[0])
  },[foodResponse])
  const formik = useFormik({
    initialValues: {
      foodId: foodId,
      createDate: new Date(),
      quantity: 0,
      status: "Active",
      type: "Import",
    },
    validationSchema: Yup.object({
      quantity: Yup.number().min(0, "Need to larger than 0"),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log(payloadData.data);
      axios
        .post(`${API}/inventoryLog`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();

          router.push(`/foods/details/${foodId}`);
        })
        .then((response) => {
          message.success("Add new inventory log success");
        })
        .catch((error) => {
          message.error("An error occurred");
          setSpinner(false);
          console.log("An error occurred:", error);
        });
    },
  });

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col justify-between gap-4">
          <Link
            href={`/foods/details/${foodId}`}
            className="flex flex-row gap-2"
          >
            {<HiOutlineArrowSmallLeft className="self-center" />} Back
          </Link>
          <h2 className="text-3xl font-bold">Add new Inventory</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="id" className="text-lg font-bold">
                ID
              </label>
              <p>{foodData.id}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="name" className="text-lg font-bold">
                Name
              </label>
              <p>{foodData.name}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="nutritionalIngredients"
                className="text-lg font-bold"
              >
                Nutritional Ingredients
              </label>
              <p>{foodData.nutritionalIngredients}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="storageCondition" className="text-lg font-bold">
                Storage Condition
              </label>
              <p>{foodData.storageCondition}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="unit" className="text-lg font-bold">
                Unit
              </label>
              <p>{foodData.unit}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="standardPrice" className="text-lg font-bold">
                Standard Price
              </label>
              <p>{foodData.standardPrice}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="safetyThreshold" className="text-lg font-bold">
                Safety Threshold
              </label>
              <p>{foodData.safetyThreshold}</p>
            </div>
          </div>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="quantity" value="Quantity" />
            <TextInput
              id="quantity"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.quantity}
            />
            {formik.touched.quantity && formik.errors.quantity ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.quantity}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type" value="Inventory log type" />
            <Select
              id="type"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.type}
            >
              <option>Import</option>
              <option>Feed</option>
              <option>Recount</option>
            </Select>
            {formik.touched.type && formik.errors.type ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.type}
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

export default InventoryReportCreatePage;
