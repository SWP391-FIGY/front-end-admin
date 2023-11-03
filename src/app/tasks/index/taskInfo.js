import { Button, Dropdown } from "flowbite-react";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";

export const taskColumns = [
  {
    name: "Id",
    selector: (row) => row.ID,
    sortable: true,
  },
  {
    name: "Bird",
    selector: (row) => row.BirdID,
    sortable: true,
  },
  {
    name: "Cage",
    selector: (row) => row.CageID,
    sortable: true,
  },
  {
    name: "Staff",
    selector: (row) => row.StaffID,
  },
  {
    name: "Task Name",
    selector: (row) => row.TaskName,
  },
  {
    name: "Date & Time",
    selector: (row) => row.DateTime,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row) => row.Description,
  },
  {
    name: "Status",
    selector: (row) => row.Status,
  },
  {
    name: "Action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        <Link href={`/tasks/edit/${row.id}`}>
          <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
        </Link>
        <Link href={`/tasks/details/${row.id}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];
