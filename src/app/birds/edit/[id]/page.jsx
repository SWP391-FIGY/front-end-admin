'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

import { message } from 'antd';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Button, Datepicker, FileInput, Label, Select, Spinner, TextInput } from 'flowbite-react';
import { useFormik } from 'formik';
import moment from 'moment/moment';
import { HiPlus } from 'react-icons/hi';
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2';
import * as Yup from 'yup';

import { API } from '@/constants';
import { firebaseStorage } from '@/firebase/config';
import useAxios from '@/hooks/useFetch';

import { birdStatusEnum } from '../../index/birdInfo';

const { default: PageLayout } = require('@/layout/pageLayout');

const BirdEditPage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const params = useParams();
  const birdId = parseInt(params.id, 10);
  const [imageUpload, setImageUpload] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch old bird data
  const {
    response: birdResponse,
    loading: birdLoading,
    error: birdError,
  } = useAxios({
    method: 'get',
    url: `${API}/bird/?filter=ID%20eq%20${birdId}&$select=*`,
  });

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
    url: `${API}/cage/?expand=species`,
  });

  // Fetch old data to form
  useEffect(() => {
    if (birdResponse) {
      console.log(birdResponse);
      formik.setValues({
        ...birdResponse[0],
      });
      setImagePreview(birdResponse[0].BirdImageUrl);
    }
  }, [birdResponse]);

  const urlRegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  const formik = useFormik({
    initialValues: {
      Id: birdId,
      SpeciesId: 0,
      CageId: 0,
      Gender: 'Male',
      IsSick: false,
      Status: 'Active',
      IsDelete: false,
      LastModifyingDate: moment(new Date()),
    },
    validationSchema: Yup.object({
      SpeciesId: Yup.number().min(1,"Please select species").required('Required'),
      CageId: Yup.number().min(1,"Please select cage").required('Required'),
    }),
    onSubmit: async (values) => {
      const payloadData = {
        data: values,
      };
      console.log('submit data', payloadData.data);
      await axios
        .put(`${API}/bird/${birdId}`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();
          router.push('/birds/index');
        })
        .then((response) => {
          message.success('Update bird success');
        })
        .catch((error) => {
          message.error('An error occurred');
          setSpinner(false);
          console.log('An error occurred:', error.response);
        });
    },
  });

  const handleFileUpload = (e) => {
    setImageUpload(e.target.files[0]);
    console.log(e.target.files);

    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSickChange = (e) => {
    if (e.target.value == "true") formik.setFieldValue('IsSick', true);
    else formik.setFieldValue('IsSick', false);
  }
  useEffect(() => {
    console.log(formik);
  }, [formik]);

  const cageSelection = cageResponse && formik.values.SpeciesId? cageResponse.filter(cage => cage.SpeciesId === formik.values.SpeciesId) : cageResponse

  return (
    <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
      <div className="flex flex-col justify-between gap-4">
        <Link href={'/birds/index'} className="flex flex-row gap-2">
          {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
        </Link>
      </div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col w-full max-w-xl gap-4 px-4 py-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold">Edit Bird</h2>
        <Label value="Bird ID" />
        <div>{formik.values.Id}</div>

        {/* // * Bird gender */}
        <div className="flex flex-col w-[500px] gap-2">
          <Label htmlFor="Gender" value="Bird gender" />
          <Select id="Gender" disabled onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Gender}>
            <option>Male</option>
            <option>Female</option>
          </Select>
          {formik.touched.Gender && formik.errors.Gender ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.Gender}</div>
          ) : null}
        </div>

        {/* // * Bird status */}
        <div className="flex flex-col w-[500px] gap-2">
          <Label htmlFor="Status" value="Bird status" />
          <Select
            id="Status"
            onChange={(e) => {
              const stringSelection = e.target.value;
              formik.setFieldValue('Status', stringSelection);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.Status}
          >
            <option value={0}>Select...</option>
            {birdStatusEnum.map((status, index) => {
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

        {/* //* Bird species */}
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="SpeciesId" value="Bird species" />
          <div className="flex w-full gap-2">
            <div className="w-[500px]">
              <Select
                id="SpeciesId"
                disabled
                onChange={(e) => {
                  const stringSelection = e.target.value;
                  formik.setFieldValue('SpeciesId', parseInt(stringSelection));
                }}
                onBlur={formik.handleBlur}
                value={formik.values.SpeciesId}
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

          {formik.touched.SpeciesId && formik.errors.SpeciesId ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.SpeciesId}</div>
          ) : null}
        </div>
        {/* // * Bird cage */}
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="CageId" value="Bird cage" />
          <div className="flex w-full gap-2">
            <div className="w-[500px]">
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
                  cageSelection.map((cage, index) => {
                    return (
                      <option key={index} value={cage.Id}>
                        Cage {cage.Id} - {cage.Species.Name} - {cage.Period}
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

        

        <Button type="submit" className="w-[500px] ">
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

export default BirdEditPage;
