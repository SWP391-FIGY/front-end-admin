import { Button, Dropdown } from "flowbite-react";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";

export const taskColumns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Bird ID",
    selector: (row) => row.birdID,
    sortable: true,
  },
  {
    name: "Cage",
    selector: (row) => row.cageID,    
    sortable: true,
  },
  {
    name: "Staff",
    selector: (row) => row.staffID,
  },
  {
    name: "Task Name",
    selector: (row) => row.taskName,
  },
  {
    name: "Date & Time",
    selector: (row) => row.dateTime,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row) => row.description,
  },
  {
    name: "Status",
    selector: (row) => row.status,
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
