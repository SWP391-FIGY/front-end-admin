'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { message } from 'antd';
import axios from 'axios';
import { Button, Label, Select, Spinner, Table, TextInput } from 'flowbite-react';
import { useFormik } from 'formik';
import { FiTrash2 } from 'react-icons/fi';
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2';
import * as Yup from 'yup';

import { birdStatusEnum } from '@/app/birds/index/birdInfo';
import { API } from '@/constants';
import useAxios from '@/hooks/useFetch';

import { menuStatusEnum } from '../../index/menuInfo';

const { default: PageLayout } = require('@/layout/pageLayout');

const MenuUpdatePage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const [selectedFood, setSelectedFood] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const params = useParams();
  const uid = params.id;

  console.log('editing id', uid);

  // Get species list
  const {
    response: speciesResponse,
    loading: speciesLoading,
    error: speciesError,
  } = useAxios({
    method: 'get',
    url: `${API}/species?select=*`,
  });

  // Get food list
  const {
    response: foodResponse,
    loading: foodLoading,
    error: foodError,
  } = useAxios({
    method: 'get',
    url: `${API}/food?select=*`,
  });

  const {
    response: menuResponse,
    loading: menuLoading,
    error: menuError,
  } = useAxios({
    method: 'get',
    url: `${API}/menu/?filter=ID%20eq%20${uid}&expand=species,menuFoods`,
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
      Id: uid,
      Name: '',
      SpeciesId: 1,
      Status: 0,
      Description: '',
      MenuFoods: [],
      LastModified: new Date(),
    },
    validationSchema: Yup.object({
      Name: Yup.string().required('Required'),
      SpeciesId: Yup.number().required('Species is required'),
      Status: Yup.number().required('Required'),
      Description: Yup.string().required('Required'),
      MenuFoods: Yup.array().min(1, 'Need at least 1 food in Menu'),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log('submit data', payloadData.data);
      axios
        .put(`${API}/menu/${uid}`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();
          router.push('/menu/index');
        })
        .then((response) => {
          message.success('Update Menu success');
        })

        .catch((error) => {
          message.error('An error occurred');
          setSpinner(false);
          console.log('An error occurred:', error);
        });
    },
  });

  const onFoodSelected = (e) => {
    setSelectedFood(e.target.value);
    console.log(selectedFood);
  };

  const onAddFoodClick = (e) => {
    const existingItemIndex = formik.values.MenuFoods.findIndex((item) => item.FoodID === selectedFood);

    if (existingItemIndex !== -1) {
      const updatedFoodItems = [...formik.values.MenuFoods];
      updatedFoodItems[existingItemIndex].Quantity += parseFloat(selectedQuantity);
      formik.setFieldValue('MenuFoods', updatedFoodItems);
    } else {
      // If it doesn't exist, add a new item
      formik.setFieldValue('MenuFoods', [
        ...formik.values.MenuFoods,
        {
          FoodID: selectedFood,
          Quantity: parseFloat(selectedQuantity),
        },
      ]);
    }
  };

  function deleteFoodItem(foodId) {
    const updatedFoodItems = formik.values.MenuFoods.filter((item) => item.FoodID !== foodId);
    formik.setFieldValue('MenuFoods', updatedFoodItems);
  }

  //(() => {
  //  console.log(formik);
  //}, [formik]);

  return (
    <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
      <div className="flex flex-col justify-between gap-4">
        <Link href={'/menu/index'} className="flex flex-row gap-2">
          {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
        </Link>
        <h2 className="text-3xl font-bold">Update Menu</h2>
      </div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-[600px] bg-white px-4 py-8 rounded-lg shadow-lg">
        <Label value="Menu ID" />
        <div>{formik.values.Id}</div>
        {/* // * Menu Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="Name" value="Menu name" />
          <TextInput id="Name" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Name} />
          {formik.touched.Name && formik.errors.Name ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.Name}</div>
          ) : null}
        </div>

        {/* //* Bird species */}
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="SpeciesId" value="Bird species" />
          <div className="flex w-full gap-2">
            <div className="w-full">
              <Select
                id="SpeciesId"
                onChange={(e) => {
                  const stringSelection = e.target.value;
                  formik.setFieldValue('SpeciesId', parseInt(stringSelection));
                }}
                onBlur={formik.handleBlur}
                value={formik.values.SpeciesId}
              >
                {speciesResponse && speciesResponse.length > 0 ? (
                  speciesResponse.map((species, index) => {
                    return (
                      <option key={index} value={species.Id}>
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

          {formik.touched.SpeciesId && formik.errors.SpeciesId ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.SpeciesId}</div>
          ) : null}
        </div>

        
        {/* // * Menu status */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="Status" value="Menu Status" />
          <Select
            id="Status"
            name="Status"
            onChange={(e) => {
              const stringSelection = e.target.value;
              formik.setFieldValue('Status', parseInt(stringSelection));
            }}
            onBlur={formik.handleBlur}
            value={formik.values.Status}
          >
            {menuStatusEnum.map((status, index) => {
              return (
                <option key={index}>
                  {status}
                </option>
              );
            })}
          </Select>
          {formik.touched.Status && formik.errors.Status ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.Status}</div>
          ) : null}
        </div>

        {/* //* Description */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="Description" value="Nutritional Ingredients" />
          <TextInput
            id="Description"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Description}
          />
          {formik.touched.Description && formik.errors.Description ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.Description}</div>
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

              {formik.values.MenuFoods &&
                formik.values.MenuFoods.length > 0 &&
                formik.values.MenuFoods.map((item, index) => {
                  const foodItem = foodResponse.find((x) => x.Id== item.FoodId);
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>{foodItem.Name}</Table.Cell>
                      <Table.Cell>{item.Quantity}</Table.Cell>
                      <Table.Cell>{foodItem.Unit}</Table.Cell>
                      <Table.Cell className="flex items-center gap-2" onClick={() => deleteFoodItem(item.FoodID)}>
                        <FiTrash2 />
                        Delete
                      </Table.Cell>
                    </Table.Row>
                  );
                })}

              <Table.Row>
                <Table.Cell>
                  <Select id="selectedFood" onChange={onFoodSelected} value={selectedFood}>
                    {foodResponse && foodResponse.length > 0 ? (
                      foodResponse.map((food, index) => {
                        return (
                          <option key={index} value={food.Id}>
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
                    value={selectedQuantity}
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
  );
};

export default MenuUpdatePage;
