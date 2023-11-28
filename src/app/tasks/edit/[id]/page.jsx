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
    url: `${API}/cage?expand=species,currentbirds`,
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
      Name: '',
      Description: '',
      AssignDate: moment(new Date()),
      Status: 'Pending',
      CageId: 0,
      MenuId: 0,
      StaffId: 0,
    },
    validationSchema: Yup.object({
      AssignDate: Yup.date().required('Required'),
      CageId: Yup.number().min(1,"Please select cage").required('Required'),
      Description: Yup.string().required('Required'),
      MenuId: Yup.number().min(1,"Please select menu").required('Required'),
      Name: Yup.string().required('Required'),
      StaffId: Yup.number().min(1,"Please select staff").required('Required'),
      Status: Yup.string(),
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
        <div>{formik.values.Id}</div>
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="Name" value="Task name" />
          <div className="flex w-full gap-2">
            <div className="w-full">
              <TextInput id="Name" name="Name" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Name} />
            </div>
          </div>
          {formik.touched.Name && formik.errors.Name ? <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.Name}</div> : null}
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="Description" value="Description" />
          <div className="flex w-full gap-2">
            <div className="w-full">
              <Textarea
                id="Description"
                name="Description"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Description}
              />
            </div>
          </div>
          {formik.touched.Description && formik.errors.Description ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.Description}</div>
          ) : null}
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="CageId" value="Bird cage" />
          <div className="flex w-full gap-2">
            <div className="w-full">
              <Select
                id="CageId"
                onChange={(e) => {
                  const stringSelection = e.target.value;
                  formik.setFieldValue('CageId', parseInt(stringSelection));
                }}
                onBlur={formik.handleBlur}
                value={formik.values.CageId}
              >
                <option value={0}>Select...</option>
                {cageResponse && cageResponse.length > 0 ? (
                  cageResponse.map((cage, index) => {
                    return (
                      <option key={index} value={cage.Id}>
                        Cage {cage.Id} - {cage.Species.Name} - {cage.Period} - No. of Birds:{' '}
                        {cage.CurrentBirds && cage.CurrentBirds.filter((x) => x.Status != 'Sold' && x.Status != 'Dead').length}
                      </option>
                    );
                  })
                ) : (
                  <option disabled>Loading...</option>
                )}
              </Select>
            </div>
          </div>
          {formik.touched.CageId && formik.errors.CageId ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.CageId}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="StaffId" value="Staff" />
          <Select id="StaffId" name="StaffId" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.StaffId}>
            <option value={0}>Select...</option>
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
          {formik.touched.StaffId && formik.errors.StaffId ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.StaffId}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="MenuId" value="Menu" />
          <Select id="MenuId" name="MenuId" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.MenuId}>
            <option value={0}>Select...</option>
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
          {formik.touched.MenuId && formik.errors.MenuId ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.MenuId}</div>
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
