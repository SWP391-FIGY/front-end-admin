'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

import { DatePicker, Space, message } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { Button, Datepicker, Label, Select, Spinner, TextInput, Textarea } from 'flowbite-react';
import { useFormik } from 'formik';
import moment from 'moment/moment';
import { HiPlus } from 'react-icons/hi';
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2';
import * as Yup from 'yup';

import { API } from '@/constants';
import useAxios from '@/hooks/useFetch';

const { default: PageLayout } = require('@/layout/pageLayout');

const TaskEditPage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const params = useParams();
  const taskId = parseInt(params.id, 10);

  //Fetch old task data
  const {
    response: taskResponse,
    loading: taskLoading,
    error: taskError,
  } = useAxios({
    method: 'get',
    url: `${API}/tasks/?filter=ID%20eq%20${taskId}&select=*`,
  });

  //Fetch old data to form
  useEffect(() => {
    
    if (taskResponse) {
      const task = taskResponse.find((task) => task.Id === taskId);

      console.log(task);
      if (task) {
        formik.setValues({
          ...task,
        });
      }
    }
  }, [taskResponse]);

  //Get user data
  const {
    response: staffResponse,
    loading: staffLoading,
    error: staffError,
  } = useAxios({
    method: 'get',
    url: `${API}/user/?filter=role eq 'Staff'`,
  });

  // Get bird list
  const {
    response: birdResponse,
    loading: birdLoading,
    error: birdError,
  } = useAxios({
    method: 'get',
    url: `${API}/bird/`,
  });
  // Get cage list
  const {
    response: cageResponse,
    loading: cageLoading,
    error: cageError,
  } = useAxios({
    method: 'get',
    url: `${API}/cage/`,
  });

  //Get menu list
  const {
    response: menuResponse,
    loading: menuLoading,
    error: menuError,
  } = useAxios({
    method: 'get',
    url: `${API}/menu`,
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      startDate: moment(new Date()),
      endDate: moment(new Date()),
      staffChecked: '',
      managerChecked: '',
      status: 'Pending',
      cageId: 0,
      menuId: 0,
      staffId: 0,
    },
    validationSchema: Yup.object({
      cageId: Yup.number().required('Required'),
      menuId: Yup.number().required('Required'),
      staffId: Yup.number().required('Required'),
      name: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      startDate: Yup.date().required('Required'),
      endDate: Yup.date().required('Required'),
      status: Yup.string(),
      staffChecked: Yup.boolean(),
      managerChecked: Yup.boolean(),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log('submit data', payloadData.data);
      axios
        .put(`${API}/tasks/${taskId}`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();
          message.success('Update task success');
          router.push('/tasks/index');
        })
        .catch((error) => {
          message.error('An error occurred');
          setSpinner(false);
          console.log('An error occurred:', error.response);
        });
    },
  });

  useEffect(() => {
    console.log(formik);
  }, [formik]);

  return (
    <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in fade-in ">
      <div className="flex flex-col justify-between gap-4">
        <Link href={'/tasks/index'} className="flex flex-row gap-2">
          {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
        </Link>
      </div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-[600px] bg-white px-4 py-8 rounded-lg shadow-lg ">
        <h2 className="text-3xl font-bold">Edit task</h2>
        <Label value="Task ID" />
        <div>{formik.values.id}</div>
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
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="cageId" value="Bird cage" />
          <div className="flex w-full gap-2">
            <div className="w-full">
              <Select
                id="cageId"
                onChange={(e) => {
                  const stringSelection = e.target.value;
                  formik.setFieldValue('cageId', parseInt(stringSelection));
                }}
                onBlur={formik.handleBlur}
                value={formik.values.cageId}
              >
                {cageResponse && cageResponse.length > 0 ? (
                  cageResponse.map((cage, index) => {
                    return (
                      <option key={index} value={cage.id}>
                        Cage {cage.id}
                      </option>
                    );
                  })
                ) : (
                  <option disabled>Loading...</option>
                )}
              </Select>
            </div>
          </div>
          {formik.touched.cageId && formik.errors.cageId ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.cageId}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="staffId" value="Staff" />
          <Select id="staffId" name="staffId" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.staffId}>
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
            {menuResponse && menuResponse.length > 0 ? (
              menuResponse.map((menu, index) => {
                return (
                  <option key={index} value={menu.id}>
                    Menu {menu.name}
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
        <div className="flex flex-col w-[500px] gap-2">
          <Label htmlFor="startDate" value="Start date" />
          <Space direction="vertical" size={12}>
            <DatePicker
              className="!important"
              // showTime
              // minuteStep={30}
              // secondStep={60}
              value={dayjs(formik.values.startDate)}
              onChange={(date, dateString) => {
                if (dateString === '') {
                  formik.setFieldValue('startDate', new Date().toISOString());
                } else {
                  formik.setFieldValue('startDate', new Date(dateString).toISOString());
                }
              }}
            />
          </Space>
          {formik.touched.startDate && formik.errors.startDate ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.startDate}</div>
          ) : null}
        </div>
        <div className="flex flex-col w-[500px] gap-2">
          <Label htmlFor="endDate" value="End date" />
          <Space direction="vertical" size={12}>
            <DatePicker
              className="!important"
              value={dayjs(formik.values.endDate)}
              onChange={(date, dateString) => {
                if (dateString === '') {
                  formik.setFieldValue('endDate', new Date().toISOString());
                } else {
                  formik.setFieldValue('endDate', new Date(dateString).toISOString());
                }
              }}
            />
          </Space>
          {formik.touched.endDate && formik.errors.endDate ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.endDate}</div>
          ) : null}
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

export default TaskEditPage;
