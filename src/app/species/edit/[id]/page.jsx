"use client";
import {
  Button,
  Label,
  Select,
  TextInput,
  Datepicker,
  Spinner,
  FileInput,
} from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { message } from "antd";
import { HiPlus } from "react-icons/hi";
import moment from "moment/moment";
import axios from "axios";
import { API } from "@/constants";
import { useParams } from "next/navigation";
import useAxios from "@/hooks/useFetch";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseStorage } from "@/firebase/config";

const { default: PageLayout } = require("@/layout/pageLayout");

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
    method: "get",
    url: `${API}/species/?filter=ID%20eq%20${speciesId}&$select=*`,
  });

  // Fetch old data to form
  useEffect(() => {
    if (speciesResponse) {
      console.log(speciesResponse);
      formik.setValues({
        ...speciesResponse[0],
      });
      setImagePreview(speciesResponse[0].ImageLink);
    }
  }, [speciesResponse]);

  const urlRegExp =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  const formik = useFormik({
    initialValues: {
      ID: speciesId,
      Name: "",
      Color: "",
      Size: "",
      Voice: "",
      ImageLink: "",
      LifeExpectancy: "",
      Habitat: "",
    },
    validationSchema: Yup.object({
      Name: Yup.string().required("Required"),
      Color: Yup.string().required("Required"),
      Size: Yup.number("Require a number")
        .min(1)
        .max(200, "Max size is 200cm")
        .required("Required"),
      Voice: Yup.string()
        .matches(urlRegExp, "Voice link is not valid")
        .required("Required"),
      LifeExpectancy: Yup.number()
        .lessThan(100, "LifeExpectancy must be lower than 100")
        .positive("LifeExpectancy must be higher than 0")
        .integer("LifeExpectancy must be an integer")
        .required("Required"),
      Habitat: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        setSpinner(true);
        if (!imagePreview) {
          message.error("Please upload an image");
          throw new Error("Please upload an image");
        }
        var imageLink = speciesResponse[0].ImageLink;
        if (imagePreview != speciesResponse[0].ImageLink) {
          const fileRef = ref(
            firebaseStorage,
            `/speciesImages/${moment().format("DDMMYYYYHHmm")}-${imageUpload.name}`
          );
          await uploadBytes(fileRef, imageUpload).then(async (data) => {
            await getDownloadURL(data.ref).then(async (url) => {
              console.log("fileUrl", url);
              imageLink = url;
            })
          })
        }
        const payloadData = {
          data: values,
        };
        payloadData.data.ImageLink = imageLink;
        console.log("submit data", payloadData.data);
        axios
          .put(`${API}/species/${speciesId}`, payloadData.data)
          .then(async (response) => {
            setSpinner(false);
            formik.resetForm();
            router.push("/species/index");
          })
          .then((response) => {
            message.success("Update species success");
          })
          .catch((error) => {
            message.error("An error occurred");
            setSpinner(false);
            console.log("An error occurred:", error.response);
          });
      } catch (e) {
        console.error(e);
        setSpinner(false);
      }
    },
  });

  useEffect(() => {
    console.log(formik)
  },[formik])
  const handleFileUpload = (e) => {
    setImageUpload(e.target.files[0]);
    console.log(e.target.files);

    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col justify-between gap-4">
          <Link href={"/species/index"} className="flex flex-row gap-2">
            {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
          </Link>
          <h2 className="text-3xl font-bold">Edit Species</h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]"
        >
          <Label value="Species ID" />
          <div>{formik.values.ID}</div>

          {/* // * Species Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="Name" value="Species Name" />
            <TextInput
              id="Name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Name}
            />
            {formik.touched.Name && formik.errors.Name ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.Name}
              </div>
            ) : null}
          </div>

          {/* // * Species Color */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="Color" value="Color" />
            <TextInput
              id="Color"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Color}
            />
            {formik.touched.Color && formik.errors.Color ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.Color}
              </div>
            ) : null}
          </div>

          {/* // * Species Size */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="Size" value="Size (cm)" />
            <TextInput
              id="Size"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Size}
            />
            {formik.touched.Size && formik.errors.Size ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.Size}
              </div>
            ) : null}
          </div>

          {/* //* Species Voice */}
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="Voice" value="Voice" />
            <TextInput
              id="Voice"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Voice}
            />
            {formik.touched.Voice && formik.errors.Voice ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.Voice}
              </div>
            ) : null}
          </div>

          {/* //* Image Link */}                    
          <div className="flex flex-col w-[500px] gap-2">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Image" />
            </div>
            {imagePreview && (
              <img
                src={imagePreview}
                className="w-[200px] h-[200px]  bg-cover"
                alt="Image Preview"
              />
            )}
            <FileInput onChange={handleFileUpload} id="file" />
          </div>

          {/* //* LifeExpectancy */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="LifeExpectancy" value="Life Expectancy (Year)" />
            <TextInput
              id="LifeExpectancy"
              type="number"
              min={0}
              max={100}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.LifeExpectancy}
            />
            {formik.touched.LifeExpectancy && formik.errors.LifeExpectancy ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.LifeExpectancy}
              </div>
            ) : null}
          </div>

          {/* //* Species Habitat */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="Habitat" value="Habitat" />
            <TextInput
              id="Habitat"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Habitat}
            />
            {formik.touched.Habitat && formik.errors.Habitat ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.Habitat}
              </div>
            ) : null}
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

export default SpeciesEditPage;
