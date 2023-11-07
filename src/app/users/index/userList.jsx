import React from "react";
import { userColumns, userInfo } from "./userInfo";
import DataTable from "react-data-table-component";
import useAxios from "@/hooks/useFetch";
import { Spinner } from "flowbite-react";
import { API } from "@/constants";
import { message } from "antd";

const UserList = () => {
  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/user`,
  });

  console.log("Fetched user data", response);
  if (error) {
    message.error('Error While Getting User data')
    return <>No Data</>
  };
  if (loading && !error)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <DataTable columns={userColumns} data={response} pagination className="overflow-auto" />
    </>
  );
};

export default UserList;
