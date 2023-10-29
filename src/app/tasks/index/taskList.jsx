import { Button, Table } from "flowbite-react";
import React from "react";
import { taskInfo } from "./taskInfo";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";

const TaskList = () => {
  const router = useRouter();
  if (!taskInfo) return <>No Data</>;
  return (
    <>
      <Table className="table-auto">
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Bird ID</Table.HeadCell>
          <Table.HeadCell>Cage ID</Table.HeadCell>
          <Table.HeadCell>Staff ID</Table.HeadCell>
          <Table.HeadCell>Task Name</Table.HeadCell>
          <Table.HeadCell>Date & Time</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {taskInfo.map((task, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <span>{index}</span>
                </Table.Cell>
                <Table.Cell>
                  <span>{task.birdId}</span>
                </Table.Cell>
                <Table.Cell>
                  <span>{task.cageId}</span>
                </Table.Cell>
                <Table.Cell>
                  <span>{task.staffId}</span>
                </Table.Cell>
                <Table.Cell>
                  <span>{task.taskName}</span>
                </Table.Cell>
                <Table.Cell>
                  <span>{task.dateAndTime}</span>
                </Table.Cell>
                <Table.Cell>
                  <span>{task.description}</span>
                </Table.Cell>
                <Table.Cell>
                  <span>{task.status}</span>
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

export default TaskList;
