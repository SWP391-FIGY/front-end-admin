'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

import { message } from 'antd';
import axios from 'axios';
import { Button, Datepicker, Label, Select, Spinner, TextInput } from 'flowbite-react';
import { useFormik } from 'formik';
import moment from 'moment/moment';
import { HiPlus } from 'react-icons/hi';
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2';
import * as Yup from 'yup';

import { API } from '@/constants';
import useAxios from '@/hooks/useFetch';

import { cageStatusOptions } from '../../index/cageInfo';

const { default: PageLayout } = require('@/layout/pageLayout');

const CageEditPage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const params = useParams();
  const uid = params.id;
  const cageId = parseInt(params.id, 10);

  // Get species list
  const {
    response: speciesResponse,
    loading: speciesLoading,
    error: speciesError,
  } = useAxios({
    method: 'get',
    url: `${API}/species/`,
  });

  // Fetch old cage data
  const {
    response: cageResponse,
    loading: cageLoading,
    error: cageError,
  } = useAxios({
    method: 'get',
    url: `${API}/cage/?filter=ID%20eq%20${cageId}`,
  });

  // Fetch old data to form
  useEffect(() => {
    if (cageResponse) {
      console.log(cageResponse);
      formik.setValues({
        ...cageResponse[0],
      });
    }
  }, [cageResponse]);

  const formik = useFormik({
    initialValues: {
      speciesId: '',
      period: '',
      status: 'Active',
      capacity: 5,
    },
    validationSchema: Yup.object({
      status: Yup.string().required('Required'),
      capacity: Yup.number().required('Required'),
      period: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log('submit data', payloadData.data);
      axios
        .put(`${API}/cage/${cageId}`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();
          message.success('Update cage success');
          router.push('/cage/index');
        })
        .catch((error) => {
          message.error('An error occurred');
          setSpinner(false);
          console.log('An error occurred:', error);
        });
    },
  });

  return (
    <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
      <div className="flex flex-col justify-between gap-4">
        <Link href={'/cage/index'} className="flex flex-row gap-2">
          {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
        </Link>
      </div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-[600px] bg-white px-4 py-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold">Edit Cage</h2>
        <Label value="Cage ID" />
        <div>{formik.values.id}</div>

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
            <Link href={'/species/create?bird-add=true'}>
              <Button>
                <div className="flex flex-row justify-center gap-2">
                  <div className="my-auto">
                    <HiPlus />
                  </div>
                  <p>Add new species</p>
                </div>
              </Button>
            </Link>
          </div>

          {formik.touched.speciesId && formik.errors.speciesId ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.speciesId}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="period" value="Period" />
          <Select id="period" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.period}>
            <option>Small</option>
            <option>Molted</option>
            <option>Grow</option>
          </Select>
          {formik.touched.period && formik.errors.period ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.period}</div>
          ) : null}
        </div>

        {/* // * Cage Status */}
        <div className="flex flex-col w-[500px] gap-2">
          <Label htmlFor="status" value="Cage status" />
          <Select
            id="status"
            onChange={(e) => {
              const labelSelection = e.target.options[e.target.selectedIndex].text;
              formik.setFieldValue('status', labelSelection);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.status}
          >
            {cageStatusOptions.map((status, index) => {
              return (
                <option key={index} value={status.value}>
                  {status.label}
                </option>
              );
            })}
          </Select>
          {formik.touched.status && formik.errors.status ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.status}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="capacity" value="Capacity" />
          <TextInput id="capacity" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.capacity} />
          {formik.touched.capacity && formik.errors.capacity ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.capacity}</div>
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

export default CageEditPage;
