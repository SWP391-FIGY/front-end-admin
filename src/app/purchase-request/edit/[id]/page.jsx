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
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { FiTrash2 } from "react-icons/fi";
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";
import axios from "axios";

const { default: PageLayout } = require("@/layout/pageLayout");

const PurchaseRequestEditPage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const [selectedFood, setSelectedFood] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const params = useParams();
  const uid = params.id;

  console.log("editing id", uid);
  // Get food list
  const {
    response: foodResponse,
    loading: foodLoading,
    error: foodError,
  } = useAxios({
    method: "get",
    url: `${API}/food?select=*`,
  });

  const {
    response: purchaseRequestResponse,
    loading: purchaseRequestLoading,
    error: purchaseRequestError,
  } = useAxios({
    method: "get",
    url: `${API}/purchaseRequest/?filter=ID%20eq%20${uid}&expand=purchaseRequestDetails`,
  });

  // Fetch old data to form
  useEffect(() => {
    if (purchaseRequestResponse) {
      console.log(purchaseRequestResponse);
      formik.setValues({
        ...purchaseRequestResponse[0],
      });
    }
  }, [purchaseRequestResponse]);

  const formik = useFormik({
    initialValues: {
      ID: uid,
      CreatorID: 0,
      DateTime: new Date(),
      Status: 0,
      PurchaseRequestDetails: [],
    },
    validationSchema: Yup.object({
      CreatorID: Yup.number().min(1),
      PurchaseRequestDetails: Yup.array().min(
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
        .put(`${API}/purchaseRequest/${uid}`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();
          router.push("/purchase-request/index");
        })
        .then((response) => {
          message.success("Update purchase request success");
        })
        .catch((error) => {
          setSpinner(false);
          console.log("An error occurred:", error.response);
        });
    },
  });

  const onFoodSelected = (e) => {
    setSelectedFood(e.target.value);
    console.log(selectedFood);
  };

  const onAddFoodClick = (e) => {
    const existingItemIndex = formik.values.PurchaseRequestDetails.findIndex(
      (item) => item.FoodID === selectedFood
    );
    if (existingItemIndex !== -1) {
      const updatedFoodItems = [...formik.values.PurchaseRequestDetails];
      updatedFoodItems[existingItemIndex].Quantity +=
        parseInt(selectedQuantity);
      formik.setFieldValue("PurchaseRequestDetails", updatedFoodItems);
    } else {
      // If it doesn't exist, add a new item
      formik.setFieldValue("PurchaseRequestDetails", [
        ...formik.values.PurchaseRequestDetails,
        {
          PurchaseRequestID: uid,
          FoodID: selectedFood,
          Quantity: parseInt(selectedQuantity),
        },
      ]);
    }
  };

  function deleteFoodItem(foodID) {
    const updatedFoodItems = formik.values.PurchaseRequestDetails.filter(
      (item) => item.FoodID !== foodID
    );
    formik.setFieldValue("PurchaseRequestDetails", updatedFoodItems);
  }

  useEffect(() => {
    console.log(formik);
  }, [formik]);

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
          <h2 className="text-3xl font-bold">Edit Purchase Request</h2>
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
                <Table.HeadCell>Quantity (per unit)</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {/* //TODO: Get list food */}

                {formik.values.PurchaseRequestDetails.length > 0 &&
                  formik.values.PurchaseRequestDetails.map((item, index) => {
                    const foodItem = foodResponse.find(x=> x.ID == item.FoodID)
                    console.log(foodItem);
                    return (
                      <Table.Row key={index}>
                        <Table.Cell>{ foodItem.Name}</Table.Cell>
                        <Table.Cell>{item.Quantity}</Table.Cell>
                        <Table.Cell
                          className="flex items-center gap-2"
                          onClick={() => deleteFoodItem(item.FoodID)}
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

export default PurchaseRequestEditPage;
