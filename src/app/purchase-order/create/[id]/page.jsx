"use client";
import {
  Button,
  Label,
  Select,
  TextInput,
  Spinner,
  Table,
  Datepicker,
} from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { FiTrash2 } from "react-icons/fi";
import { useParams } from "next/navigation";
import { useAuthContext } from "@/contexts/authContext";
import { API } from "@/constants";
import useAxios from "@/hooks/useFetch";
import axios from "axios";

const { default: PageLayout } = require("@/layout/pageLayout");

const PurchaseOrderCreatePage = () => {
  const [spinner, setSpinner] = useState(false);
  const [selectedFood, setSelectedFood] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState(1);
  const [selectedNETPrice, setSelectedNETPrice] = useState(1);
  const [selectedDeliverDate, setSelectedDeliverDate] = useState(new Date());
  const { user } = useAuthContext();
  const params = useParams();
  const uid = params.id;

  console.log("editing id", uid);

  // Get old Purchase Request
  const {
    response: purchaseRequestResponse,
    loading,
    error,
  } = useAxios({
    method: "get",
    url: `${API}/purchaseRequest/?filter=ID%20eq%20${uid}&expand=creator,purchaseRequestDetails($expand=Food)`,
  });


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
      purchaseRequestID: parseInt(uid),
      createDate: new Date(),
      status: 0,
      note: "a",
      purchaseOrderDetails: [],
    },
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log("Submitted");
      axios
        .post(`${API}/purchaseOrder`, payloadData)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();
        })
        .catch((error) => {
          setSpinner(false);
          console.log("An error occurred:", error.response);
        });
    },
  });

  useEffect(() => {
    if (user) {
      console.log("context user", user);
      formik.setFieldValue("creatorID", parseInt(user.id));
    }
  }, [user]);

  const onFoodSelected = (e) => {
    setSelectedFood(e.target.value);
    console.log(selectedFood);
  };

  const onAddFoodClick = (e) => {
    const existingItemIndex = formik.values.purchaseOrderDetails.findIndex(
      (item) => item.FoodID === selectedFood
    );
    if (existingItemIndex !== -1) {
      const updatedFoodItems = [...formik.values.purchaseOrderDetails];
      updatedFoodItems[existingItemIndex].Quantity +=
        parseInt(selectedQuantity);
      formik.setFieldValue("purchaseOrderDetails", updatedFoodItems);
    } else {
      // If it doesn't exist, add a new item
      formik.setFieldValue("purchaseOrderDetails", [
        ...formik.values.purchaseOrderDetails,
        {
          FoodID: parseInt(selectedFood),
          Quantity: parseInt(selectedQuantity),
          Unit: parseInt(selectedUnit),
          NetPrice: parseInt(selectedNETPrice),
          DeliverDate: selectedDeliverDate,
        },
      ]);
    }
  };

  function deleteFoodItem(foodId) {
    const updatedFoodItems = formik.values.purchaseOrderDetails.filter(
      (item) => item.FoodID !== foodId
    );
    formik.setFieldValue("purchaseOrderDetails", updatedFoodItems);
  }

  useEffect(() => {
    console.log(formik);
  }, [formik]);

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col justify-between gap-4">
          <Link href={"/purchase-order/index"} className="flex flex-row gap-2">
            {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
          </Link>
          <h2 className="text-3xl font-bold">Add new Purchase Order</h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-full"
        >
          <div className="flex flex-col gap-2">
            <Label value="Food details" />
            <Table>
              <Table.Head>
                <Table.HeadCell>Food</Table.HeadCell>
                <Table.HeadCell>Quantity</Table.HeadCell>
                <Table.HeadCell>Unit</Table.HeadCell>
                <Table.HeadCell>NET Price</Table.HeadCell>
                <Table.HeadCell>Deliver Date</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {/* //TODO: Get list food */}

                {formik.values.purchaseOrderDetails.length > 0 &&
                  formik.values.purchaseOrderDetails.map((item, index) => {
                    return (
                      <Table.Row key={index}>
                        <Table.Cell>{foodResponse.find(f => f.ID == item.FoodID).Name}</Table.Cell>
                        <Table.Cell>{item.Quantity}</Table.Cell>
                        <Table.Cell>{foodResponse.find(f => f.ID == item.FoodID).Unit}</Table.Cell>
                        <Table.Cell>{item.NetPrice}</Table.Cell>
                        <Table.Cell>{new Date(item.DeliverDate).toDateString()}</Table.Cell>
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
                      {
                        purchaseRequestResponse ? purchaseRequestResponse[0].PurchaseRequestDetails.map((item, index) => {
                          return(
                            <option key={index} value={item.Food.ID}>{item.Food.Name}</option>
                          )
                        }) :
                        <option disabled>Loading...</option>
                      }
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
                  
                  </Table.Cell>
                  <Table.Cell>
                    <TextInput
                      id="NETPrice"
                      type="number"
                      min={1}
                      onChange={(e) => {
                        setSelectedNETPrice(e.target.value);
                      }}
                      value={selectedNETPrice}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Datepicker
                      selected={selectedDeliverDate}
                      onSelectedDateChanged={(date) => {console.log(date);setSelectedDeliverDate(date.toISOString())}}
                      dateFormat="yyyy-MM-dd"
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

export default PurchaseOrderCreatePage;
