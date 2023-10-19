import { Button, Table } from "flowbite-react";
import React from "react";
import { speciesInfo } from "./speciesInfo";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import Link from "next/link";

const SpeciesList = () => {
  if (!speciesInfo) return <>No Data</>;
  return (
    <>
      <Table className="table-auto">
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Color</Table.HeadCell>
          <Table.HeadCell>Size</Table.HeadCell>
          <Table.HeadCell>Voice</Table.HeadCell>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Age</Table.HeadCell>
          <Table.HeadCell>Habitat</Table.HeadCell>
          <Table.HeadCell>Total</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {speciesInfo.map((species, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <span>{index}</span>
                </Table.Cell>
                <Table.Cell>
                  <span>{species.color}</span>
                </Table.Cell>
                <Table.Cell>
                  <span>{species.size}</span>
                </Table.Cell>
                <Table.Cell>
                  <span>{species.voice}</span>
                </Table.Cell>
                <Table.Cell>
                  <img
                    src={species.imageLink}
                    alt={`Species Image ${index}`}
                    style={{ width: "100px", height: "auto" }}
                  />
                </Table.Cell>
                <Table.Cell>
                  <span>{species.age}</span>
                </Table.Cell>
                <Table.Cell>
                  <span>{species.habitat}</span>
                </Table.Cell>
                <Table.Cell>
                  <span>{species.total}</span>
                </Table.Cell>
                <Table.Cell className="flex flex-row gap-4">
                  <Link href={`/species/edit/${index}`}>
                    <Button>
                      <FiEdit />
                    </Button>
                  </Link>
                  <Link href={`/species/details/${index}`}>
                    <Button>
                      <FiEye />
                    </Button>
                  </Link>
                  <Button color="failure">
                    <FiTrash2 />
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

export default SpeciesList;
