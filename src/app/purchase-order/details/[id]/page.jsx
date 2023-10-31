"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { purchaseOrderInfo, purchaseOrderDetailInfo } from "../../index/purchaseOrderInfo";
import { Table } from "flowbite-react";

const { default: PageLayout } = require("@/layout/pageLayout");

const PurchaseOrderDetailPage = () => {
  const params = useParams();
  const index = parseInt(params.id, 10);

  //  useEffect(() => {
  //    axios
  //      .get(`${API}/birds/${uid}`)
  //      .then(response => {
  //        setBirdData(response.data);
  //        setLoading(false);
  //      })
  //      .catch(error => {
  //        setLoading(false);
  //        console.log('An error occurred:', error.response);
  //      });
  //  }, [uid]);
  if (isNaN(index) || index < 0 || index >= purchaseOrderInfo.length) {
    return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <p>Purchase Order not found.</p>
        </div>
      </PageLayout>
    );
  }

  const purchaseOrderData = purchaseOrderInfo[index];

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col gap-4">
          <Link
            href={"/purchase-order/index"}
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
          </Link>
          <h2 className="text-3xl font-bold">Purchase Order Details</h2>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">Purchase Order ID</label>
              <p>{purchaseOrderData.id}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">Manager ID</label>
              <p>{purchaseOrderData.managerId}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">Purchase Request ID</label>
              <p>{purchaseOrderData.purchaseRequestId}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">Created Date</label>
              <p>{purchaseOrderData.createdDate}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">PO Status</label>
              <p>{purchaseOrderData.status}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">Note</label>
              <p>{purchaseOrderData.note}</p>
            </div>
            
            <div className="col-span-2 ">
              <label className="text-lg font-bold">List Food</label>
              <Table>
                <Table.Head>
                  <Table.HeadCell>Food Name</Table.HeadCell>
                  <Table.HeadCell>Quantity</Table.HeadCell>
                  <Table.HeadCell>Unit</Table.HeadCell>
                  <Table.HeadCell>NET Price</Table.HeadCell>
                  <Table.HeadCell>Deliver Date</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {purchaseOrderDetailInfo.length > 0 &&
                    purchaseOrderDetailInfo.map((item, index) => {
                      return (
                        <Table.Row>
                          <Table.Cell>{item.foodId}</Table.Cell>
                          <Table.Cell>{item.quantity}</Table.Cell>
                          <Table.Cell>{item.unit}</Table.Cell>
                          <Table.Cell>{item.NETPrice}</Table.Cell>
                          <Table.Cell>{item.deliverDate}</Table.Cell>
                        </Table.Row>
                      );
                    })}
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
export default PurchaseOrderDetailPage;
