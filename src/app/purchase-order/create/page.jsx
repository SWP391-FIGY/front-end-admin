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

const { default: PageLayout } = require("@/layout/pageLayout");

const PurchaseOrderCreatePage = () => {
  const [spinner, setSpinner] = useState(false);
  const [selectedFood, setSelectedFood] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState(1);
  const [selectedNETPrice, setSelectedNETPrice] = useState(1);
  const [selectedDeliverDate, setSelectedDeliverDate] = useState(1);

  const formik = useFormik({
    initialValues: {
      purchaseOrderDetails: [],
    },
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log("Submitted");
      axios
        .post(`${API}/cage`, payloadData)
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

  const onFoodSelected = (e) => {
    setSelectedFood(e.target.value);
    console.log(selectedFood);
  };

  const onAddFoodClick = (e) => {
    const existingItemIndex = formik.values.purchaseOrderDetails.findIndex(
      (item) => item.foodId === selectedFood
    );
    if (existingItemIndex !== -1) {
      const updatedFoodItems = [...formik.values.purchaseOrderDetails];
      updatedFoodItems[existingItemIndex].quantity += parseInt(selectedQuantity);
      formik.setFieldValue("purchaseOrderDetails", updatedFoodItems);
    } else {
      // If it doesn't exist, add a new item
      formik.setFieldValue("purchaseOrderDetails", [
        ...formik.values.purchaseOrderDetails,
        {
          foodId: selectedFood,
          quantity: parseInt(selectedQuantity),
          unit: parseInt(selectedUnit),
          NETPrice: parseInt(selectedNETPrice),
          deliverDate: selectedDeliverDate,
        },
      ]);
    }
  };

  function deleteFoodItem(foodId) {
    const updatedFoodItems = formik.values.purchaseOrderDetails.filter(item => item.foodId !== foodId);
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
          className="flex flex-col gap-4 w-[600px]"
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
                      <Table.Row>
                        <Table.Cell>{item.foodId}</Table.Cell>
                        <Table.Cell>{item.quantity}</Table.Cell>
                        <Table.Cell>{item.unit}</Table.Cell>
                        <Table.Cell>{item.NETPrice}</Table.Cell>
                        <Table.Cell>{item.deliverDate}</Table.Cell>
                        <Table.Cell className="flex items-center gap-2" onClick={() => deleteFoodItem(item.foodId)}><FiTrash2/>Delete</Table.Cell>
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
                      <option value={1}>Species 1</option>
                      <option value={2}>Species 2</option>
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
                    <TextInput
                      id="unit"
                      type="number"
                      min={1}
                      onChange={(e) => {
                        setSelectedUnit(e.target.value);
                      }}
                      value={selectedUnit}
                    />
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
                        onChange={(date) => setSelectedDeliverDate(date)}
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
