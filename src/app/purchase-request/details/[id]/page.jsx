"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { purchaseRequestInfo, purchaseRequestDetailInfo } from "../../index/purchaseRequestInfo";
import { Table } from "flowbite-react";

const { default: PageLayout } = require("@/layout/pageLayout");

const PurchaseRequestDetailPage = () => {
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
  if (isNaN(index) || index < 0 || index >= purchaseRequestInfo.length) {
    return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <p>Purchase Request not found.</p>
        </div>
      </PageLayout>
    );
  }

  const purchaseRequestData = purchaseRequestInfo[index];

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

        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">Purchase request Id</label>
              <p>{purchaseRequestData.id}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">Creator Id</label>
              <p>{purchaseRequestData.creatorId}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">Created Date</label>
              <p>{purchaseRequestData.createdDate}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">PR status</label>
              <p>{purchaseRequestData.status}</p>
            </div>
            
            <div className="col-span-2 ">
              <label className="text-lg font-bold">List Food</label>
              <Table>
                <Table.Head>
                  <Table.HeadCell>Food Name</Table.HeadCell>
                  <Table.HeadCell>Quantity</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {purchaseRequestDetailInfo.length > 0 &&
                    purchaseRequestDetailInfo.map((item, index) => {
                      return (
                        <Table.Row key={index}>
                          <Table.Cell>{item.foodId}</Table.Cell>
                          <Table.Cell>{item.quantity}</Table.Cell>
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
export default PurchaseRequestDetailPage;
