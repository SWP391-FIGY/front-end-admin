'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { DatePicker, Space, message } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { Button, Datepicker, Label, Select, Spinner, Table, TextInput, Textarea } from 'flowbite-react';
import { useFormik } from 'formik';
import moment from 'moment/moment';
import { FiTrash2 } from 'react-icons/fi';
import { HiPlus } from 'react-icons/hi';
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2';
import * as Yup from 'yup';

import { API } from '@/constants';
import useAxios from '@/hooks/useFetch';

const { default: PageLayout } = require('@/layout/pageLayout');

const TaskCreatePage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState(0);
  const [selectedCages, setSelectedCages] = useState([]);
  const [selectedCage, setSelectedCage] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState({});

  var tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  tomorrow.setHours(new Date().getHours() + 7);

  // Get species list
  const {
    response: speciesResponse,
    loading: speciesLoading,
    error: speciesError,
  } = useAxios({
    method: 'get',
    url: `${API}/species/`,
  });
  // Get cage list
  const {
    response: cageResponse,
    loading: cageLoading,
    error: cageError,
  } = useAxios({
    method: 'get',
    url: `${API}/cage?expand=species,currentbirds`,
  });

  const {
    response: todoResponse,
    loading: todoLoading,
    error: todoError,
  } = useAxios({
    method: 'get',
    url: `${API}/tasks/todocages`,
  });

  // Get staff list
  // TODO: Nho cho dieu kien ve role
  const {
    response: staffResponse,
    loading: staffLoading,
    error: staffError,
  } = useAxios({
    method: 'get',
    url: `${API}/user/?filter=role eq 'Staff'`,
  });

  //Get menu list
  const {
    response: menuResponse,
    loading: menuLoading,
    error: menuError,
  } = useAxios({
    method: 'get',
    url: `${API}/menu?expand=species,menufoods($expand=food)`,
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
      // BirdId: 1,
      // CageId: 1,
      // StaffId: 1,
      // TaskName: '',
      // DateTime: moment(new Date()),
      // Description: '',
      // Status: 'Pending',

      name: '',
      description: '',
      assignDate: moment(tomorrow),
      status: 'Ongoing',
      menuId: 0,
      staffId: 0,
    },
    validationSchema: Yup.object({
      menuId: Yup.number().required('Required'),
      name: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      menuId: Yup.number().min(1,"Please select menu"),
      staffId: Yup.number().min(1,"Please select staff"),
      status: Yup.string(),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        task: values,
        cageIdList: [...selectedCages],
      };
      console.log(payloadData);
      if (!selectedCages || selectedCages.length == 0) {
        message.error('Please select cage');
        setSpinner(false);
        return;
      }
      axios
        .post(`${API}/tasks/assign/multiplecages`, payloadData)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();

          router.push('/tasks/index');
        })
        .then((response) => {
          message.success('Add new task success');
        })
        .catch((error) => {
          message.error('An error occurred');
          setSpinner(false);
          console.log('An error occurred:', error.response);
        });
    },
  });

  useEffect(() => {
    if (staffResponse && staffResponse.length > 0) {
      formik.setFieldValue('staffId', staffResponse[0].id);
    }
  }, [staffResponse]);

  useEffect(() => {
    if (cageResponse && cageResponse.length > 0) {
      formik.setFieldValue('cageId', cageResponse[0].id);
    }
  }, [cageResponse]);

  useEffect(() => {
    if (menuResponse && menuResponse.length > 0) {
      formik.setFieldValue('menuId', menuResponse[0].id);
      setSelectedMenu(menuResponse[0].menuFoods); // Update the selectedMenuFoods state
    }
  }, [menuResponse]);
  
  useEffect(() => {
    if (menuResponse && menuResponse.length > 0 && formik.values.menuId) {
      const menu = menuResponse.find(x => x.Id == formik.values.menuId)
      console.log('found menu',menu);
      setSelectedMenu(menu); // Update the selectedMenuFoods state
    }
  }, [formik.values.menuId]);

  useEffect(() => {
    console.log(formik);
  }, [formik]);
  useEffect(() => {
    console.log('selectedSpecies', selectedSpecies);
  }, [selectedSpecies]);

  useEffect(() => {
    console.log('selectedCages', selectedCages);
  }, [selectedCages]);
  const onAddCageClick = (e) => {
    const existingItemIndex = selectedCages.findIndex((item) => item == selectedCage);

    if (existingItemIndex === -1)
      // If it doesn't exist, add a new item
      setSelectedCages([...selectedCages, selectedCage]);
  };

  function deleteCageItem(cageId) {
    const updatedCages = selectedCages.filter((item) => item !== cageId);
    setSelectedCages(updatedCages);
  }
  const onCageSelected = (e) => {
    setSelectedCage(e.target.value);
  };

  return (
    <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in fade-in ">
      <div className="flex flex-col justify-between gap-4">
        <Link href={'/tasks/index'} className="flex flex-row gap-2">
          {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
        </Link>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 w-[600px] bg-white px-4 py-8 rounded-lg shadow-lg bg-white px-4 py-10 rounded-lg"
      >
        <h2 className="text-3xl font-bold">Add new task for tomorrow</h2>

        {/* // * task name */}
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="name" value="Task name" />
          <div className="flex w-full gap-2">
            <div className="w-full">
              <TextInput id="name" name="name" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
            </div>
          </div>
          {formik.touched.name && formik.errors.name ? <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.name}</div> : null}
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="description" value="Description" />
          <div className="flex w-full gap-2">
            <div className="w-full">
              <Textarea
                id="description"
                name="description"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
            </div>
          </div>
          {formik.touched.description && formik.errors.description ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.description}</div>
          ) : null}
        </div>
        {/* //* Bird species */}
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="speciesId" value="Bird species" />
          <div className="flex w-full gap-2">
            <Select
              id="speciesId"
              onChange={(e) => {
                const stringSelection = e.target.value;
                setSelectedCages([])
                setSelectedMenu({})
                formik.setFieldValue('menuId', 0);
                console.log('selected species',stringSelection);
                setSelectedSpecies(parseInt(stringSelection));
              }}
              onBlur={formik.handleBlur}
              value={selectedSpecies}
            >
              <option value={0}>Choose species...</option>
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

          {formik.touched.speciesId && formik.errors.speciesId ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.speciesId}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="staffId" value="Staff" />
          <Select id="staffId" name="staffId" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.staffId}>
            <option value={0}>Choose staff...</option>
            {staffResponse && staffResponse.length > 0 ? (
              staffResponse.map((staff, index) => {
                return (
                  <option key={index} value={staff.id}>
                    Staff {staff.fullName}
                  </option>
                );
              })
            ) : (
              <option disabled>Loading...</option>
            )}
          </Select>
          {formik.touched.staffId && formik.errors.staffId ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.staffId}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="menuId" value="Menu" />
          <Select id="menuId" name="menuId" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.menuId}>
            <option value={0}>Select...</option>
            {menuResponse && menuResponse.length > 0 ? (
              menuResponse
                .filter((x) => selectedSpecies && x.SpeciesId == selectedSpecies)
                .map((menu, index) => {
                  return (
                    <option key={index} value={menu.Id}>
                      Menu {menu.Name} - {menu.Species && menu.Species.Name}
                    </option>
                  );
                })
            ) : (
              <option disabled>Loading...</option>
            )}
          </Select>
          {formik.touched.menuId && formik.errors.menuId ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.menuId}</div>
          ) : null}
        </div>

        {/* //* Display Food Items */}
        <div className="flex flex-col gap-2">
          <Label value="Food items in the selected menu" />
          <Table>
            <Table.Head>
              <Table.HeadCell>Food</Table.HeadCell>
              <Table.HeadCell>Required Quantity</Table.HeadCell>
              <Table.HeadCell>Unit</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {formik.values.menuId && formik.values.menuId > 0 &&
                menuResponse.find(x => x.Id == formik.values.menuId).MenuFoods.map((item, index) => {
                  const foodItem = item.Food;
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>{foodItem.Name}</Table.Cell>
                      <Table.Cell>{item.Quantity} </Table.Cell>
                      <Table.Cell>{foodItem.Unit}</Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        </div>

        <div className="flex flex-col w-[500px] gap-2">
          <Label htmlFor="endDate" value="Assigning date" />
          <Space direction="vertical" size={12}>
            <DatePicker
              className="!important"
              // showTime
              // minuteStep={30}
              // secondStep={60}
              value={dayjs(tomorrow)}
              disabled
            />
          </Space>
          {formik.touched.endDate && formik.errors.endDate ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.endDate}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label value="Assigning Cages" />
          <Table>
            <Table.Head>
              <Table.HeadCell>Cage - {selectedCages.length}</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {selectedCages.length > 0 &&
                selectedCages.map((item, index) => {
                  var cage = cageResponse.find((x) => x.Id == item);
                  console.log('found dcage', cage);
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>
                        Cage {cage.Id} - {cage.Species.Name} - {cage.Period} - No. of Birds:{' '}
                        {cage.CurrentBirds && cage.CurrentBirds.filter((x) => x.Status != 'Sold' && x.Status != 'Dead').length}
                      </Table.Cell>
                      <Table.Cell className="flex items-center gap-2" onClick={() => deleteCageItem(item)}>
                        <FiTrash2 />
                        Delete
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              <Table.Row>
                <Table.Cell>
                  <Select id="selectedFood" onChange={onCageSelected} value={selectedCage}>
                    <option value={0}>Choose cage...</option>
                    {todoResponse && todoResponse.length > 0 ? (
                      todoResponse
                        .filter((x) => {
                          var activeBirdInCage = x.currentBirds ? x.currentBirds.filter((x) => x.status != 'Sold' && x.status != 'Dead').length : 0;
                          var isSameSpecies = selectedSpecies == x.speciesId;
                          return activeBirdInCage > 0 && isSameSpecies;
                        })
                        .map((cage, index) => {
                          return (
                            <option key={index} value={cage.id}>
                              Cage {cage.id} - {cage.species.name} - {cage.period} - No. of Birds:{' '}
                              {cage.currentBirds ? cage.currentBirds.filter((x) => x.status != 'Sold' && x.status != 'Dead').length : 0}
                            </option>
                          );
                        })
                    ) : (
                      <option disabled>Loading...</option>
                    )}
                  </Select>
                </Table.Cell>

                <Table.Cell>
                  <Button onClick={onAddCageClick}>Add Cage</Button>
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

export default TaskCreatePage;
