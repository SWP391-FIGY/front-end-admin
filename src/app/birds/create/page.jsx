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
import useAxios from "@/hooks/useFetch";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "@/firebase/config";

const { default: PageLayout } = require("@/layout/pageLayout");

const BirdCreatePage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  // Get species list
  const {
    response: speciesResponse,
    loading: speciesLoading,
    error: speciesError,
  } = useAxios({
    method: "get",
    url: `${API}/species/`,
  });
  // Get cage list
  const {
    response: cageResponse,
    loading: cageLoading,
    error: cageError,
  } = useAxios({
    method: "get",
    url: `${API}/cage/`,
  });

  const urlRegExp =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  const formik = useFormik({
    initialValues: {
      Description: "",
      SpeciesId: 1,
      CageID: 1,
      DoB: moment(new Date()).format("DD/MM/YYYY"),
      LastModifyDate: moment(new Date()),
      Gender: "Male",
      birdStatus: 0,
    },
    validationSchema: Yup.object({
      Description: Yup.string().required("Required"),
      SpeciesId: Yup.number().required("Required"),
      CageID: Yup.number().required("Required"),
      DoB: Yup.date()
        .max(new Date().toLocaleDateString(), "Birth date must before today")
        .required("Required"),
      Gender: Yup.string().required("Required"),
      birdStatus: Yup.number().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        setSpinner(true);
        if (!imageUpload) {
          message.error("Please upload an image");
          throw new Error("Please upload an image");
        }
        const fileRef = ref(
          firebaseStorage,
          `/birdImages/${moment().format("DDMMYYYYHHmm")}-${imageUpload.name}`
        );
        uploadBytes(fileRef, imageUpload).then((data) => {
          getDownloadURL(data.ref).then((url) => {
            console.log("fileUrl", url);
            // * set upload data
            const payloadData = {
              data: values,
            };
            payloadData.data.BirdImageUrl = url;
            console.log(payloadData.data);
            // * upload to BE
            axios
              .post(`${API}/bird`, payloadData.data)
              .then((response) => {
                setSpinner(false);
                formik.resetForm();

                router.push("/birds/index");
              })
              .then((response) => {
                message.success("Add new bird success");
              })
              .catch((error) => {
                message.error("An error occurred");
                setSpinner(false);
                console.log("An error occurred:", error.response);
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
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col justify-between gap-4">
          <Link href={"/birds/index"} className="flex flex-row gap-2">
            {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
          </Link>
          <h2 className="text-3xl font-bold">Add new Birds</h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-full"
        >
          {/* // * Bird birthDate */}
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="DoB" value="DoB" />
            <Datepicker
              id="DoB"
              language="vi-VN"
              value={moment(formik.values.DoB).format("DD/MM/YYYY")}
              onSelectedDateChanged={(date) => {
                console.log(new Date(date));
                formik.setFieldValue("DoB", date);
                console.log("value", formik.values);
                console.log("errors", formik.errors);
              }}
              onBlur={formik.handleBlur}
              onSelect={(e) => {
                console.log(e);
              }}
            />
            {formik.touched.DoB && formik.errors.DoB ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.DoB}
              </div>
            ) : null}
          </div>

          {/* // * Bird gender */}
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="Gender" value="Bird gender" />
            <Select
              id="Gender"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Gender}
            >
              <option>Trống</option>
              <option>Cái</option>
            </Select>
            {formik.touched.Gender && formik.errors.Gender ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.Gender}
              </div>
            ) : null}
          </div>

          {/* //* Bird Description */}
          <div className="flex flex-col w-[500px] gap-2">
            <Label htmlFor="Description" value="Description" />
            <TextInput
              id="Description"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Description}
            />
            {formik.touched.Description && formik.errors.Description ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.Description}
              </div>
            ) : null}
          </div>

          {/* //* Bird image */}
          <div className="flex flex-col w-[500px] gap-2">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Bird Image" />
            </div>
            {imagePreview && (
              <img
                src={imagePreview}
                className="w-[200px] h-[200px] bg-cover"
                alt="Image Preview"
              />
            )}
            <FileInput onChange={handleFileUpload} id="file" />
          </div>

          {/* //* Bird species */}
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="SpeciesId" value="Bird species" />
            <div className="flex w-full gap-2">
              <div className="w-[500px]">
                <Select
                  id="SpeciesId"
                  onChange={(e) => {
                    const stringSelection = e.target.value;
                    formik.setFieldValue(
                      "SpeciesId",
                      parseInt(stringSelection)
                    );
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.SpeciesId}
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
              <Link href={"/species/create?bird-add=true"}>
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

            {formik.touched.SpeciesId && formik.errors.SpeciesId ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.SpeciesId}
              </div>
            ) : null}
          </div>
          {/* // * Bird cage */}
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="CageId" value="Bird cage" />
            <div className="flex w-full gap-2">
              <div className="w-[500px]">
                <Select
                  id="CageID"
                  onChange={(e) => {
                    const stringSelection = e.target.value;
                    formik.setFieldValue("CageID", parseInt(stringSelection));
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.CageID}
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
              <Link
                href={{
                  pathname: "/cage/create",
                  query: { ...formik.values, "bird-add": true },
                }}
              >
                <Button>
                  <div className="flex flex-row justify-center gap-2">
                    <div className="my-auto">
                      <HiPlus />
                    </div>
                    <p>Add new cage</p>
                  </div>
                </Button>
              </Link>
            </div>
            {formik.touched.CageID && formik.errors.CageID ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.CageID}
              </div>
            ) : null}
          </div>

          <Button type="submit" className="w-[500px] ">
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

export default BirdCreatePage;
