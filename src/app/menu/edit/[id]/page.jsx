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
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { message } from "antd";
import axios from "axios";
import { API } from "@/constants";
import { FiTrash2 } from "react-icons/fi";
import useAxios from "@/hooks/useFetch";
import { birdStatusEnum } from "@/app/birds/index/birdInfo";
import { menuStatusEnum } from "../../index/menuInfo";

const { default: PageLayout } = require("@/layout/pageLayout");

const MenuUpdatePage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const [selectedFood, setSelectedFood] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const params = useParams();
  const uid = params.id;

  console.log("editing id", uid);

  // Get species list
  const {
    response: speciesResponse,
    loading: speciesLoading,
    error: speciesError,
  } = useAxios({
    method: "get",
    url: `${API}/species?select=*`,
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

  const {
    response: menuResponse,
    loading: menuLoading,
    error: menuError,
  } = useAxios({
    method: "get",
    url: `${API}/mealMenu/?filter=ID%20eq%20${uid}&expand=species,menuDetails($expand=Food)`,
  });

  // Fetch old data to form
  useEffect(() => {
    if (menuResponse) {
      console.log(menuResponse);
      formik.setValues({
        ...menuResponse[0],
      });
    }
  }, [menuResponse]);

  const formik = useFormik({
    initialValues: {
      ID: uid,
      MenuName: "",
      SpeciesID: 1,
      DaysBeforeFeeding: 1,
      Size: "",
      BirdStatus: 0,
      MenuStatus: 0,
      NutritionalIngredients: "",
      MenuDetails: [],
    },
    validationSchema: Yup.object({
      MenuName: Yup.string().required("Required"),
      SpeciesID: Yup.number().required("Species is required"),
      DaysBeforeFeeding: Yup.number()
        .min(1, "Minimum Day Before Feeding Must Be 1 Day Or More")
        .required("Required"),
      Size: Yup.string().required("Required"),
      BirdStatus: Yup.number().required("Required"),
      MenuStatus: Yup.number().required("Required"),
      NutritionalIngredients: Yup.string().required("Required"),
      MenuDetails: Yup.array().min(1, "Need at least 1 food in Menu"),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log("submit data", payloadData.data);
      axios
        .put(`${API}/mealMenu/${uid}`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();
          router.push("/purchase-request/index");
        })
        .then((response) => {
          message.success("Update Menu success");
        })

        .catch((error) => {
          message.error("An error occurred");
          setSpinner(false);
          console.log("An error occurred:", error);
        });
    },
  });

  const onFoodSelected = (e) => {
    setSelectedFood(e.target.value);
    console.log(selectedFood);
  };

  const onAddFoodClick = (e) => {
    const existingItemIndex = formik.values.MenuDetails.findIndex(
      (item) => item.FoodID === selectedFood
    );

    if (existingItemIndex !== -1) {
      const updatedFoodItems = [...formik.values.MenuDetails];
      updatedFoodItems[existingItemIndex].Quantity +=
      parseFloat(selectedQuantity);
      formik.setFieldValue("MenuDetails", updatedFoodItems);
    } else {
      // If it doesn't exist, add a new item
      formik.setFieldValue("MenuDetails", [
        ...formik.values.MenuDetails,
        {
          FoodID: selectedFood,
          Quantity: parseFloat(selectedQuantity),
        },
      ]);
    }
  };

  function deleteFoodItem(foodId) {
    const updatedFoodItems = formik.values.MenuDetails.filter(
      (item) => item.FoodID !== foodId
    );
    formik.setFieldValue("MenuDetails", updatedFoodItems);
  }

  //(() => {
  //  console.log(formik);
  //}, [formik]);

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col justify-between gap-4">
          <Link href={"/menu/index"} className="flex flex-row gap-2">
            {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
          </Link>
          <h2 className="text-3xl font-bold">Update Menu</h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]"
        >
          {/* // * Menu Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="MenuName" value="Menu name" />
            <TextInput
              id="MenuName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.MenuName}
            />
            {formik.touched.MenuName && formik.errors.MenuName ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.MenuName}
              </div>
            ) : null}
          </div>

          {/* //* Bird species */}
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="SpeciesID" value="Bird species" />
            <div className="flex w-full gap-2">
              <div className="w-full">
                <Select
                  id="SpeciesID"
                  onChange={(e) => {
                    const stringSelection = e.target.value;
                    formik.setFieldValue(
                      "SpeciesID",
                      parseInt(stringSelection)
                    );
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.SpeciesID}
                >
                  {speciesResponse && speciesResponse.length > 0 ? (
                    speciesResponse.map((species, index) => {
                      return (
                        <option key={index} value={species.ID}>
                          {species.Name}
                        </option>
                      );
                    })
                  ) : (
                    <option disabled>Loading...</option>
                  )}
                </Select>
              </div>
            </div>

            {formik.touched.SpeciesID && formik.errors.SpeciesID ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.SpeciesID}
              </div>
            ) : null}
          </div>

          {/* //* minimum day Before feeding */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="DaysBeforeFeeding" value="Days Before Feeding" />
            <TextInput
              id="DaysBeforeFeeding"
              type="number"
              min={0}
              max={365}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.DaysBeforeFeeding}
            />
            {formik.touched.DaysBeforeFeeding &&
            formik.errors.DaysBeforeFeeding ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.DaysBeforeFeeding}
              </div>
            ) : null}
          </div>

          {/* //* Bird Size */}

          <div className="flex flex-col gap-2">
            <Label htmlFor="Size" value="Size" />
            <TextInput
              id="Size"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Size}
            />
            {formik.touched.Size && formik.errors.Size ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.Size}
              </div>
            ) : null}
          </div>

          {/* // * Bird status */}
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="BirdStatus" value="Bird status" />
            <Select
              id="BirdStatus"
              name="BirdStatus"
              onChange={(e) => {
                const stringSelection = e.target.value;
                formik.setFieldValue("BirdStatus", parseInt(stringSelection));
              }}
              onBlur={formik.handleBlur}
              value={formik.values.BirdStatus}
            >
              {birdStatusEnum.map((status, index) => {
                return <option key={index} value={index}>{status}</option>;
              })}
            </Select>
            {formik.touched.BirdStatus && formik.errors.BirdStatus ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.BirdStatus}
              </div>
            ) : null}
          </div>

          {/* // * Menu status */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="MenuStatus" value="Menu Status" />
            <Select
              id="MenuStatus"
              name="MenuStatus"
              onChange={(e) => {
                const stringSelection = e.target.value;
                formik.setFieldValue("MenuStatus", parseInt(stringSelection));
              }}
              onBlur={formik.handleBlur}
              value={formik.values.MenuStatus}
            >
              {menuStatusEnum.map((status, index) => {
                return <option key={index} value={index}>{status}</option>;
              })}
            </Select>
            {formik.touched.MenuStatus && formik.errors.MenuStatus ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.MenuStatus}
              </div>
            ) : null}
          </div>

          {/* //* nutritional Ingredients */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="NutritionalIngredients"
              value="Nutritional Ingredients"
            />
            <TextInput
              id="NutritionalIngredients"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.NutritionalIngredients}
            />
            {formik.touched.NutritionalIngredients &&
            formik.errors.NutritionalIngredients ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.NutritionalIngredients}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label value="Food details" />
            <Table>
              <Table.Head>
                <Table.HeadCell>Food</Table.HeadCell>
                <Table.HeadCell>Quantity</Table.HeadCell>
                <Table.HeadCell>Unit</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {/* //TODO: Get list food */}

                {formik.values.MenuDetails &&
                  formik.values.MenuDetails.length > 0 &&
                  formik.values.MenuDetails.map((item, index) => {
                    const foodItem = foodResponse.find(
                      (x) => x.ID == item.FoodID
                    );
                    return (
                      <Table.Row key={index}>
                        <Table.Cell>{foodItem.Name}</Table.Cell>
                        <Table.Cell>{item.Quantity}</Table.Cell>
                        <Table.Cell>{foodItem.Unit}</Table.Cell>
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
                              {`${food.Name} (${food.Unit})`}
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
                      id="Quantity"
                      type="number"
                      min={1}
                      onChange={(e) => {
                        setSelectedQuantity(e.target.value);
                      }}
                      value={selectedQuantity }
                    />
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
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

export default MenuUpdatePage;
