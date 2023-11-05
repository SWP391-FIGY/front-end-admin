"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import {
  purchaseRequestDetailColumns, purchaseRequestStatusEnum,
} from "../../index/purchaseRequestInfo";
import { Table } from "flowbite-react";
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";
import DataTable from "react-data-table-component";
import moment from "moment";

const { default: PageLayout } = require("@/layout/pageLayout");

const PurchaseRequestDetailPage = () => {
  const params = useParams();
  const index = parseInt(params.id, 10);

  const {
    response: purchaseRequestResponse,
    loading,
    error,
  } = useAxios({
    method: "get",
    url: `${API}/purchaseRequest/?filter=ID%20eq%20${index}&expand=creator,purchaseRequestDetails($expand=Food)`,
  });
  if (isNaN(index) || index < 0) {
    return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <p>Purchase Request not found.</p>
        </div>
      </PageLayout>
    );
  }

  console.log(purchaseRequestResponse);

  const purchaseRequestData = purchaseRequestResponse
    ? purchaseRequestResponse[0]
    : null;

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col gap-4">
          <Link
            href={"/purchase-request/index"}
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
          </Link>
          <h2 className="text-3xl font-bold">Purchase Request Details</h2>
        </div>

        {purchaseRequestData && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="text-lg font-bold">Purchase request Id</label>
                <p>{purchaseRequestData.ID}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="text-lg font-bold">Creator staff</label>
                <p>{purchaseRequestData.Creator.Name}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="text-lg font-bold">Created Date</label>
                <p>
                  {moment(purchaseRequestData.DateTime).format("DD/MM/YYYY")}
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="text-lg font-bold">PR status</label>
                <p>{purchaseRequestStatusEnum[purchaseRequestData.Status]}</p>
              </div>

              <div className="col-span-2 ">
                <label className="text-lg font-bold">List Food</label>
                <DataTable
                  columns={purchaseRequestDetailColumns}
                  data={purchaseRequestData.PurchaseRequestDetails}
                  pagination
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};
export default PurchaseRequestDetailPage;
