'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { message } from 'antd';
import axios from 'axios';
import { Button, Label, Select, Spinner, Table, TextInput } from 'flowbite-react';
import { useFormik } from 'formik';
import moment from 'moment/moment';
import { FiTrash2 } from 'react-icons/fi';
import { HiPlus } from 'react-icons/hi';
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2';
import * as Yup from 'yup';

import { birdStatusEnum } from '@/app/birds/index/birdInfo';
import { API } from '@/constants';
import { useAuthContext } from '@/contexts/authContext';
import useAxios from '@/hooks/useFetch';

const { default: PageLayout } = require('@/layout/pageLayout');

const MenuCreatePage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const [selectedFood, setSelectedFood] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Get species list
  const {
    response: speciesResponse,
    loading: speciesLoading,
    error: speciesError,
  } = useAxios({
    method: 'get',
    url: `${API}/species/`,
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

  const formik = useFormik({
    initialValues: {
      name: '',
      speciesId: 1,
      status: 'Active',
      description: '',
      menuFoods: [],
      createDate: new Date(),
      lastModified: new Date(),
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      speciesId: Yup.number().min(1,"Please select species").required('Required'),
      
      description: Yup.string().required('Required'),
      menuFoods: Yup.array().min(1, 'Need at least 1 food in Menu'),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log(payloadData.data);
      axios
        .post(`${API}/menu`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();
          router.push('/menu/index');
        })
        .then((response) => {
          message.success('Add new Menu success');
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
    const existingItemIndex = formik.values.menuFoods.findIndex((item) => item.foodId === selectedFood);

    if (existingItemIndex !== -1) {
      const updatedFoodItems = [...formik.values.menuFoods];
      updatedFoodItems[existingItemIndex].quantity += parseInt(selectedQuantity);
      formik.setFieldValue('menuFoods', updatedFoodItems);
    } else {
      // If it doesn't exist, add a new item
      formik.setFieldValue('menuFoods', [
        ...formik.values.menuFoods,
        {
          foodId: selectedFood,
          quantity: parseInt(selectedQuantity),
        },
      ]);
    }
  };

  function deleteFoodItem(foodId) {
    const updatedFoodItems = formik.values.menuFoods.filter((item) => item.foodId !== foodId);
    formik.setFieldValue('menuFoods', updatedFoodItems);
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
      </div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-[600px] bg-white px-4 py-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold">Add new Menu</h2>
        {/* // * Menu Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" value="Menu name" />
          <TextInput id="name" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.name}</div>
          ) : null}
        </div>

        {/* //* Bird species */}
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="speciesId" value="Bird species" />
          <div className="flex w-full gap-2">
            <div className="w-[500px]">
              <Select
                id="speciesId"
                onChange={(e) => {
                  const stringSelection = e.target.value;
                  formik.setFieldValue('speciesId', parseInt(stringSelection));
                }}
                onBlur={formik.handleBlur}
                value={formik.values.speciesId}
              >
                <option value={0}>Select...</option>
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
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.speciesId}</div>
          ) : null}
        </div>

        {/* //* description */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="description" value="Description" />
          <TextInput
            id="description"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.description}</div>
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

              {formik.values.menuFoods.length > 0 &&
                formik.values.menuFoods.map((item, index) => {
                  var food = foodResponse.find(x => x.Id == item.foodId)
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>{food.Name}</Table.Cell>
                      <Table.Cell>{item.quantity}</Table.Cell>
                      <Table.Cell className="flex items-center gap-2" onClick={() => deleteFoodItem(item.foodId)}>
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
                            {food.Name} ({food.Unit})
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
            <div className="flex items-center justify-center gap-4">
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

export default MenuCreatePage;
