"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { cageInfo,} from "../../index/cageInfo";
import { birdInfo } from "../../../birds/index/birdInfo";
import { Table } from "flowbite-react";

const { default: PageLayout } = require("@/layout/pageLayout");

const CageDetailPage = () => {
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
  if (isNaN(index) || index < 0 || index >= cageInfo.length) {
    return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <p>Cage not found.</p>
        </div>
      </PageLayout>
    );
  }

  const cageData = cageInfo[index];
  
  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col gap-4">
          <Link
            href={"/cage/index"}
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
          </Link>
          <h2 className="text-3xl font-bold">Cage Details</h2>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">Cage Id</label>
              <p>{cageData.id}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">Size (cm)</label>
              <p>{cageData.size}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">Color</label>
              <p>{cageData.color}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">Type</label>
              <p>{cageData.type}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">Area</label>
              <p>{cageData.area}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">Cage Status</label>
              <p>{cageData.cageStatus}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">Capacity</label>
              <p>{cageData.capacity}</p>
            </div>
            
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
export default CageDetailPage;