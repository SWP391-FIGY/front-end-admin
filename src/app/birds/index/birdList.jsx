import { Button, Pagination, Table } from "flowbite-react";
import React, { useState } from "react";
import { birdColumns, birdInfo } from "./birdInfo";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DataTable from "react-data-table-component";

const BirdList = () => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = parseInt(birdInfo.length / itemsPerPage) + 1;
  const onPageChange = (page) => setCurrentPage(page);

  if (!birdInfo) return <>No Data</>;
  return (
    <>
      <DataTable
        columns={birdColumns}
        data={[...birdInfo, ...birdInfo, ...birdInfo, ...birdInfo]}
        pagination
      />
    </>
  );
};

export default BirdList;
