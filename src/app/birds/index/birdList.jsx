import { Button, Pagination, Table } from "flowbite-react";
import React, { useState } from "react";
import { birdInfo } from "./birdInfo";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DataTable from "datatables.net-dt";

const BirdList = () => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = parseInt(birdInfo.length / itemsPerPage) + 1;
  const onPageChange = (page) => setCurrentPage(page);

  if (!birdInfo) return <>No Data</>;
  let table = new DataTable('#table-auto');
  return (
    <>
      <Table className="table-auto">
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Species</Table.HeadCell>
          <Table.HeadCell>Birth Date</Table.HeadCell>
          <Table.HeadCell>Gender</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {birdInfo
            .slice(itemsPerPage * (currentPage - 1), itemsPerPage * currentPage)
            .map((bird, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>
                    <span>{bird.name}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{bird.species}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{bird.birthDate}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{bird.gender}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{bird.status}</span>
                  </Table.Cell>
                  <Table.Cell className="flex flex-row gap-4">
                    <Link href={`/birds/edit/${index}`}>
                      <Button>
                        <FiEdit />
                      </Button>
                    </Link>
                    <Link href={`/birds/details/${index}`}>
                      <Button>
                        <FiEye />
                      </Button>
                    </Link>
                    <Button color="failure" onClick={() => {}}>
                      <FiTrash2 />
                    </Button>
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

export default BirdList;
