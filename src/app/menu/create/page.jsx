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

const { default: PageLayout } = require("@/layout/pageLayout");

const MenuCreatePage = () => {
  const [spinner, setSpinner] = useState(false);
  const [selectedFood, setSelectedFood] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const formik = useFormik({
    initialValues: {
      menuName: "",
      speciesId: 1,
      age: 3,
      size: "",
      birdStatus: 1,
      menuStatus: 1,
      nutritionalIngredients: "",
      menuDetails: [],
    },
    validationSchema: Yup.object({
      menuName: Yup.string().required("Required"),
      speciesId: Yup.number().required("Species is required"),
    }),
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
    const existingItemIndex = formik.values.menuDetails.findIndex(
      (item) => item.foodId === selectedFood
    );

    if (existingItemIndex !== -1) {
      const updatedFoodItems = [...formik.values.menuDetails];
      updatedFoodItems[existingItemIndex].quantity += parseInt(selectedQuantity);
      formik.setFieldValue("menuDetails", updatedFoodItems);
    } else {
      // If it doesn't exist, add a new item
      formik.setFieldValue("menuDetails", [
        ...formik.values.menuDetails,
        {
          foodId: selectedFood,
          quantity: parseInt(selectedQuantity),
        },
      ]);
    }
  };

  function deleteFoodItem(foodId) {
    const updatedFoodItems = formik.values.menuDetails.filter(item => item.foodId !== foodId);
    formik.setFieldValue("menuDetails", updatedFoodItems);
  }

  useEffect(() => {
    console.log(formik);
  }, [formik]);

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col justify-between gap-4">
          <Link href={"/menu/index"} className="flex flex-row gap-2">
            {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
          </Link>
          <h2 className="text-3xl font-bold">Add new Menu</h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="menuName" value="Menu name" />
            <TextInput
              id="menuName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.menuName}
            />
            {formik.touched.menuName && formik.errors.menuName ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.menuName}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="speciesId" value="Species Id" />
            <Select
              id="speciesId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.speciesId}
            >
              <option value={1}>Species 1</option>
              <option value={2}>Species 2</option>
            </Select>
            {formik.touched.speciesId && formik.errors.speciesId ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.speciesId}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="age" value="Age" />
            <TextInput
              id="age"
              type="number"
              min={0}
              max={20}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="size" value="Size" />
            <TextInput
              id="size"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.size}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="birdStatus" value="Bird Status" />
            <TextInput
              id="birdStatus"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.birdStatus}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="menuStatus" value="Menu Status" />
            <TextInput
              id="menuStatus"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.menuStatus}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="nutritionalIngredients"
              value="Nutritional Ingredients"
            />
            <TextInput
              id="nutritionalIngredients"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nutritionalIngredients}
            />
          </div>

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

                {formik.values.menuDetails.length > 0 &&
                  formik.values.menuDetails.map((item, index) => {
                    return (
                      <Table.Row key={index}>
                        <Table.Cell>{item.foodId}</Table.Cell>
                        <Table.Cell>{item.quantity}</Table.Cell>
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

export default MenuCreatePage;
