"use client";
import {
  Button,
  Label,
  Select,
  TextInput,
  Spinner,
  Table,
} from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { FiTrash2 } from "react-icons/fi";
import { useAuthContext } from "@/contexts/authContext";
import { API } from "@/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import useAxios from "@/hooks/useFetch";
import { message } from "antd";

const { default: PageLayout } = require("@/layout/pageLayout");

const PurchaseRequestCreatePage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const [selectedFood, setSelectedFood] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { user, setUser } = useAuthContext();
  // Get food list
  const {
    response: foodResponse,
    loading: foodLoading,
    error: foodError,
  } = useAxios({
    method: "get",
    url: `${API}/food?select=*`,
  });

  const formik = useFormik({
    initialValues: {
      creatorID: 0,
      dateTime: new Date(),
      status: 1,
      purchaseRequestDetails: [],
    },
    validationSchema: Yup.object({
      creatorID: Yup.number().min(1),
      purchaseRequestDetails: Yup.array().min(
        1,
        "Need at least 1 food in request"
      ),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log("Submitted");
      axios
        .post(`${API}/purchaseRequest`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();
          router.push("/purchase-request/index");
        })
        .then((response) => {
          message.success("Add new purchase request success");
        })
        .catch((error) => {
          setSpinner(false);
          console.log("An error occurred:", error);
        });
    },
  });
  useEffect(() => {
    if (user) {
      console.log("context user", user);
      formik.setFieldValue("creatorID", parseInt(user.id));
    }
  }, [user]);
  useEffect(() => {
    console.log("current formik", formik);
  }, [formik]);

  const onFoodSelected = (e) => {
    setSelectedFood(e.target.value);
    console.log(selectedFood);
  };

  const onAddFoodClick = (e) => {
    const existingItemIndex = formik.values.purchaseRequestDetails.findIndex(
      (item) => item.foodId === selectedFood
    );
    if (existingItemIndex !== -1) {
      const updatedFoodItems = [...formik.values.purchaseRequestDetails];
      updatedFoodItems[existingItemIndex].quantity +=
        parseInt(selectedQuantity);
      formik.setFieldValue("purchaseRequestDetails", updatedFoodItems);
    } else {
      // If it doesn't exist, add a new item
      formik.setFieldValue("purchaseRequestDetails", [
        ...formik.values.purchaseRequestDetails,
        {
          foodId: selectedFood,
          quantity: parseInt(selectedQuantity),
        },
      ]);
    }
  };

  function deleteFoodItem(foodId) {
    const updatedFoodItems = formik.values.purchaseRequestDetails.filter(
      (item) => item.foodId !== foodId
    );
    formik.setFieldValue("purchaseRequestDetails", updatedFoodItems);
  }

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col justify-between gap-4">
          <Link
            href={"/purchase-request/index"}
            className="flex flex-row gap-2"
          >
            {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
          </Link>
          <h2 className="text-3xl font-bold">Add new Purchase Request</h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]"
        >
          <div className="flex flex-col gap-2">
            <Label value="Food details" />

            <Table>
              <Table.Head>
                <Table.HeadCell>Food</Table.HeadCell>
                <Table.HeadCell>Quantity</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {/* //TODO: Get list food */}

                {formik.values.purchaseRequestDetails.length > 0 &&
                  formik.values.purchaseRequestDetails.map((item, index) => {
                    return (
                      <Table.Row key={index}>
                        <Table.Cell>{item.foodId}</Table.Cell>
                        <Table.Cell>{item.quantity}</Table.Cell>
                        <Table.Cell
                          className="flex items-center gap-2"
                          onClick={() => deleteFoodItem(item.foodId)}
                        >
                          <FiTrash2 />
                          Delete
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}

                <Table.Row>
                  <Table.Cell>
                    <Select
                      id="selectedFood"
                      onChange={onFoodSelected}
                      value={selectedFood}
                    >
                      {foodResponse && foodResponse.length > 0 ? (
                        foodResponse.map((food, index) => {
                          return (
                            <option key={index} value={food.ID}>
                              {food.Name}
                            </option>
                          );
                        })
                      ) : (
                        <option disabled>Loading...</option>
                      )}
                    </Select>
                  </Table.Cell>
                  <Table.Cell>
                    <TextInput
                      id="quantity"
                      type="number"
                      min={1}
                      onChange={(e) => {
                        setSelectedQuantity(e.target.value);
                      }}
                      value={selectedQuantity}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Button onClick={onAddFoodClick}>Add new Food</Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
          {formik.touched.purchaseRequestDetails &&
          formik.errors.purchaseRequestDetails ? (
            <div className="text-xs text-red-600 dark:text-red-400">
              {formik.errors.purchaseRequestDetails}
            </div>
          ) : null}
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

export default PurchaseRequestCreatePage;
