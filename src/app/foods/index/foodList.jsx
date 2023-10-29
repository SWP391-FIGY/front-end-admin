import { Button, Table } from "flowbite-react";
import React from "react";
import { foodInfo } from "./foodInfo";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import Link from "next/link";

const FoodList = () => {
  if (!foodInfo) return <>No Data</>;
  return (
    <>
      <Table className="table-auto">
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Nutritional Ingredients</Table.HeadCell>
          <Table.HeadCell>Storage Conditions</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {foodInfo.map((food, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <span>{index}</span>
                </Table.Cell>
                <Table.Cell>
                  <span>{food.name}</span>
                </Table.Cell>
                <Table.Cell>
                  <span>{food.nutritionalIngredients}</span>
                </Table.Cell>
                <Table.Cell>
                  <span>{food.storageConditions}</span>
                </Table.Cell>
                <Table.Cell className="flex flex-row gap-4">
                  <Link href={`/foods/edit/${index}`}>
                    <Button>
                      <FiEdit />
                    </Button>
                  </Link>
                  <Link href={`/foods/edit/${index}`}>
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

export default FoodList;
