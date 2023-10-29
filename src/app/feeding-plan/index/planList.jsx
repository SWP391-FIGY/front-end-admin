import { Button, Table } from "flowbite-react";
import React from "react";
import { planInfo } from "./planInfo";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PlanList = () => {
  const router = useRouter();
  if (!planInfo) return <>No Data</>;
  return (
    <>
      <Table className="table-auto">
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Menu ID</Table.HeadCell>
          <Table.HeadCell>Bird ID</Table.HeadCell>
          <Table.HeadCell>Date & Time</Table.HeadCell>
          <Table.HeadCell>Feeding Status</Table.HeadCell>
          <Table.HeadCell>Notation</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {planInfo.map((plan, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <span>{index}</span>
                </Table.Cell>
                <Table.Cell>
                  <span>{plan.menuId}</span>
                </Table.Cell>
                <Table.Cell>
                  <span>{plan.birdId}</span>
                </Table.Cell>
                <Table.Cell>
                  <span>{plan.dateAndTime}</span>
                </Table.Cell>
                <Table.Cell>
                  <span>{plan.feedingStatus}</span>
                </Table.Cell>
                <Table.Cell>
                  <span>{plan.notation}</span>
                </Table.Cell>
                <Table.Cell className="flex flex-row gap-4">
                  <Link href={`edit/${index}`}>
                    <Button>
                      <FiEdit />
                    </Button>
                  </Link>
                  <Link href={`details/${index}`}>
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

export default PlanList;

