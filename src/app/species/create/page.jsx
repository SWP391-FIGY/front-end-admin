'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

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

const { default: PageLayout } = require('@/layout/pageLayout');

const SpeciesCreatePage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const urlRegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  const formik = useFormik({
    initialValues: {
      name: '',
      descriptionImage: '',
      habitat: '',
      status: 'Active',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      habitat: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      try {
        setSpinner(true);
        if (!imageUpload) {
          message.error('Please upload an image');
          throw new Error('Please upload an image');
        }
        const fileRef = ref(firebaseStorage, `/speciesImages/${moment().format('DDMMYYYYHHmm')}-${imageUpload.name}`);
        uploadBytes(fileRef, imageUpload).then((data) => {
          getDownloadURL(data.ref).then((url) => {
            console.log('fileUrl', url);
            // * set upload data
            const payloadData = {
              data: values,
            };
            payloadData.data.descriptionImage = url;
            console.log(payloadData.data);
            // * upload to BE
            axios
              .post(`${API}/species`, payloadData.data)
              .then((response) => {
                setSpinner(false);
                formik.resetForm();

                router.push('/species/index');
              })
              .then((response) => {
                message.success('Add new species success');
              })
              .catch((error) => {
                message.error('An error occurred');
                setSpinner(false);
                console.log('An error occurred:', error);
              });
          });
        });
      } catch (e) {
        console.error(e);
        setSpinner(false);
      }
    },
  });
  const handleFileUpload = (e) => {
    setImageUpload(e.target.files[0]);
    console.log(e.target.files);

    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in fade-in ">
      <div className="flex flex-col justify-between gap-4">
        <Link href={'/species/index'} className="flex flex-row gap-2">
          {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
        </Link>
      </div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-[600px] bg-white px-4 py-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold">Add new Species</h2>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" value="Species name" />
          <TextInput id="name" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
          {formik.touched.name && formik.errors.name ? <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.name}</div> : null}
        </div>

        <div className="flex flex-col gap-2">
          <div className="block mb-2">
            <Label htmlFor="file" value="Image Link" />
          </div>
          {imagePreview && <img src={imagePreview} className="w-[200px] h-[200px]  bg-cover" alt="Image Preview" />}
          <FileInput onChange={handleFileUpload} id="file" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="habitat" value="Habitat" />
          <TextInput id="habitat" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.habitat} />
          {formik.touched.habitat && formik.errors.habitat ? (
            <div className="text-xs text-red-600 dark:text-red-400">{formik.errors.habitat}</div>
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

export default SpeciesCreatePage;
