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
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";
import axios from "axios";
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
    url: `${API}/species/`,
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
  }, [menuResponse])

  const formik = useFormik({
    initialValues: {
      id: uid,
      menuName: "",
      speciesId: 1,
      daysBeforeFeeding: 1,
      size: "",
      birdStatus: 0,
      menuStatus: 0,
      nutritionalIngredients: "",
      menuDetails: [],
    },
    validationSchema: Yup.object({
      menuName: Yup.string().required("Required"),
      speciesId: Yup.number().required("Species is required"),
      daysBeforeFeeding: Yup.number().min(1, "Minimum Day Before Feeding Must Be 1 Day Or More").required("Required"),
      size: Yup.string().required("Required"),
      birdStatus: Yup.number().required("Required"),
      menuStatus: Yup.number().required("Required"),
      nutritionalIngredients: Yup.string().required("Required"),
      menuDetails: Yup.array().min(
        1,
        "Need at least 1 food in Menu"
      ),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log("Submitted");
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
          <h2 className="text-3xl font-bold">Update Menu</h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]"
        >
          {/* // * Menu Name */}
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

          {/* //* Bird species */}
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="SpeciesId" value="Bird species" />
            <div className="flex w-full gap-2">
              <div className="w-[500px]">
                <Select
                  id="SpeciesId"
                  onChange={(e) => {
                    const stringSelection = e.target.value
                    formik.setFieldValue("SpeciesId", parseInt(stringSelection));
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.SpeciesId}
                >
                  {speciesResponse && speciesResponse.length > 0 ? (
                    speciesResponse.map((species, index) => {
                      return (
                        <option key={index} value={species.id}>
                          {species.name}
                        </option>
                      );
                    })
                  ) : (
                    <option disabled>Loading...</option>
                  )}
                </Select>
              </div>

            </div>

            {formik.touched.speciesId && formik.errors.speciesId ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.speciesId}
              </div>
            ) : null}
          </div>

          
          {/* //* minimum day Before feeding */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="daysBeforeFeeding" value="daysBeforeFeeding" />
            <TextInput
              id="daysBeforeFeeding"
              type="number"
              min={0}
              max={365}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.daysBeforeFeeding}
            />
            {formik.touched.daysBeforeFeeding && formik.errors.daysBeforeFeeding ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.daysBeforeFeeding}
              </div>
            ) : null}
          </div>


          {/* //* Bird Size */}

          <div className="flex flex-col gap-2">
            <Label htmlFor="size" value="Size" />
            <TextInput
              id="size"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.size}
            />
            {formik.touched.size && formik.errors.size ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.size}
              </div>
            ) : null}
          </div>



          {/* // * Bird status */}
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="birdStatus" value="Bird status" />
            <Select
              id="birdStatus"
              onChange={(e) => {
                const stringSelection = e.target.value
                formik.setFieldValue("birdStatus", parseInt(stringSelection));
              }}
              onBlur={formik.handleBlur}
              value={formik.values.birdStatus}
            >
              {birdStatusEnum.map((status, index) => {
                <option value={index}>{status}</option>
              })}
            </Select>
            {formik.touched.birdStatus && formik.errors.birdStatus ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.birdStatus}
              </div>
            ) : null}
          </div>
{/* // * Menu status */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="menuStatus" value="Menu Status" />
            <Select
              id="menuStatus"
              onChange={(e) => {
                const stringSelection = e.target.value
                formik.setFieldValue("menuStatus", parseInt(stringSelection));
              }}
              onBlur={formik.handleBlur}
              value={formik.values.menuStatus}
            >
              {menuStatusEnum.map((status, index) => {
                <option value={index}>{status}</option>
              })}
            </Select>
            {formik.touched.menuStatus && formik.errors.menuStatus ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.menuStatus}
              </div>
            ) : null}
          </div>

          {/* //* nutritional Ingredients */}
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
            {formik.touched.nutritionalIngredients && formik.errors.nutritionalIngredients ? (
              <div className='text-xs text-red-600 dark:text-red-400'>
                {formik.errors.nutritionalIngredients}
              </div>
            ) : null}
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
                    const foodItem = foodResponse.find(x=> x.ID == item.FoodID)
                    console.log(foodItem);
                    return (
                      <Table.Row key={index}>
                        <Table.Cell>{ foodItem.Name}</Table.Cell>
                        <Table.Cell>{item.quantity}</Table.Cell>
                        <Table.Cell className="flex items-center gap-2" onClick={() => deleteFoodItem(item.foodId)}><FiTrash2 />Delete</Table.Cell>
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

export default MenuUpdatePage;
