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
import { speciesStatusOptions } from '../../index/speciesInfo';

const { default: PageLayout } = require('@/layout/pageLayout');

const SpeciesEditPage = () => {
  const [spinner, setSpinner] = useState(false);
  const params = useParams();
  const router = useRouter();
  const speciesId = parseInt(params.id, 10);
  const [imageUpload, setImageUpload] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch old species data
  const {
    response: speciesResponse,
    loading: speciesLoading,
    error: speciesError,
  } = useAxios({
    method: 'get',
    url: `${API}/species/?filter=ID%20eq%20${speciesId}&$select=*`,
  });

  // Fetch old data to form
  useEffect(() => {
    if (speciesResponse) {
      console.log(speciesResponse);
      formik.setValues({
        ...speciesResponse[0],
      });
      setImagePreview(speciesResponse[0].DescriptionImage);
    }
  }, [speciesResponse]);

  const urlRegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  const formik = useFormik({
    initialValues: {
      ID: speciesId,
      Name: '',
      DescriptionImage: '',
      Habitat: '',
    },
    validationSchema: Yup.object({
      Name: Yup.string().required('Required'),
      Habitat: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        setSpinner(true);
        if (!imagePreview) {
          message.error('Please upload an image');
          throw new Error('Please upload an image');
        }
        var DescriptionImage = speciesResponse[0].DescriptionImage;
        if (imagePreview != speciesResponse[0].DescriptionImage) {
          const fileRef = ref(firebaseStorage, `/speciesImages/${moment().format('DDMMYYYYHHmm')}-${imageUpload.name}`);
          await uploadBytes(fileRef, imageUpload).then(async (data) => {
            await getDownloadURL(data.ref).then(async (url) => {
              console.log('fileUrl', url);
              DescriptionImage = url;
            });
          });
        }
        const payloadData = {
          data: values,
        };
        payloadData.data.DescriptionImage = DescriptionImage;
        console.log('submit data', payloadData.data);
        axios
          .put(`${API}/species/${speciesId}`, payloadData.data)
          .then(async (response) => {
            setSpinner(false);
            formik.resetForm();
            router.push('/species/index');
          })
          .then((response) => {
            message.success('Update species success');
          })
          .catch((error) => {
            message.error('An error occurred');
            setSpinner(false);
            console.log('An error occurred:', error.response);
          });
      } catch (e) {
        console.error(e);
        setSpinner(false);
      }
    },
  });

  useEffect(() => {
    console.log(formik);
  }, [formik]);
  const handleFileUpload = (e) => {
    setImageUpload(e.target.files[0]);
    console.log(e.target.files);

    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
      <div className="flex flex-col justify-between gap-4">
        <Link href={'/species/index'} className="flex flex-row gap-2">
          {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
        </Link>
      </div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-[600px] bg-white px-4 py-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold">Edit Species</h2>
        <Label value="Species ID" />
        <div>{formik.values.ID}</div>

        {/* // * Species Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="Name" value="Species Name" />
          <TextInput id="Name" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Name} />
          {formik.touched.Name && formik.errors.Name ? <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.Name}</div> : null}
        </div>

        

        {/* //* Description Image */}
        <div className="flex flex-col w-[500px] gap-2">
          <div className="block mb-2">
            <Label htmlFor="file" value="Description Image" />
          </div>
          {imagePreview && <img src={imagePreview} className="w-[200px] h-[200px]  bg-cover" alt="Image Preview" />}
          <FileInput onChange={handleFileUpload} id="file" />
        </div>

        {/* //* Species Habitat */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="Habitat" value="Habitat" />
          <TextInput id="Habitat" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Habitat} />
          {formik.touched.Habitat && formik.errors.Habitat ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.Habitat}</div>
          ) : null}
        </div>

        {/* // * Species status */}
        <div className="flex flex-col w-[500px] gap-2">
          <Label htmlFor="Status" value="Species status" />
          <Select
            id="Status"
            onChange={(e) => {
              const labelSelection = e.target.options[e.target.selectedIndex].text;
              formik.setFieldValue('Status', labelSelection);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.Status}
          >
            {speciesStatusOptions.map((status, index) => {
              return (
                <option key={index} value={status.value}>
                  {status.label}
                </option>
              );
            })}
          </Select>
          {formik.touched.Status && formik.errors.Status ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.Status}</div>
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

export default SpeciesEditPage;
