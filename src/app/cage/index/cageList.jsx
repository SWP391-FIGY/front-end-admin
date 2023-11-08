import React, { useState } from "react";
import { cageInfo } from "./cageInfo";
import { Button, Pagination, Spinner, Table } from "flowbite-react";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";

const CageList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = parseInt(cageInfo.length / itemsPerPage) + 1;
  const onPageChange = (page) => setCurrentPage(page);

  const { response, loading, error } =  useAxios({
    method: 'get',
        url: `${API}/cage`        
  })

  console.log('Fetched cage data', response);
  if (error) return <>No Data</>;
  if (loading && !error)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner aria-label="Spinner button example" />
      </div>
    );
  return (
    <>
      <Table className="table-auto">
        <Table.Head>
          <Table.HeadCell>Id</Table.HeadCell>
          <Table.HeadCell>Size (cm)</Table.HeadCell>
          <Table.HeadCell>Color</Table.HeadCell>
          <Table.HeadCell>Area</Table.HeadCell>
          <Table.HeadCell>Type</Table.HeadCell>
          <Table.HeadCell>Capacity</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {response
            .slice(itemsPerPage * (currentPage - 1), itemsPerPage * currentPage)
            .map((item, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>
                    <span>{item.id}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{item.size}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{item.color}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{item.area}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{item.type}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{item.capacity}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{item.cageStatus}</span>
                  </Table.Cell>
                  <Table.Cell className="flex flex-row gap-4">
                    <Link href={`/cage/edit/${item.id}`}>
                      <Button>
                        <FiEdit />
                      </Button>
                    </Link>
                    <Link href={`/cage/details/${item.id}`}>
                      <Button>
                        <FiEye />
                      </Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
      <Pagination
        className="self-end"
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
        totalPages={totalPages}
      />
    </>
  );
};

export default CageList;
