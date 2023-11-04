"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { menuInfo, menuDetailInfo } from "../../index/menuInfo";
import { Table } from "flowbite-react";

const { default: PageLayout } = require("@/layout/pageLayout");

const MenuDetailPage = () => {
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
  if (isNaN(index) || index < 0 || index >= menuInfo.length) {
    return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <p>Menu not found.</p>
        </div>
      </PageLayout>
    );
  }

  const menuData = menuInfo[index];

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col gap-4">
          <Link
            href={"/menu/index"}
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
          </Link>
          <h2 className="text-3xl font-bold">Menu Details</h2>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">Name</label>
              <p>{menuData.menuName}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">Age</label>
              <p>{menuData.age}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">Size</label>
              <p>{menuData.size}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">Bird status</label>
              <p>{menuData.birdStatus}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">Menu Status</label>
              <p>{menuData.menuStatus}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">
                Nutritional Ingredients
              </label>
              <p>{menuData.nutritionalIngredients}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-lg font-bold">Species Id</label>
              <p>{menuData.speciesId}</p>
            </div>
            <div className="col-span-2 ">
              <label className="text-lg font-bold">Species Id</label>
              <Table>
                <Table.Head>
                  <Table.HeadCell>Food Name</Table.HeadCell>
                  <Table.HeadCell>Quantity</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {menuDetailInfo.length > 0 &&
                    menuDetailInfo.map((item, index) => {
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
export default MenuDetailPage;
