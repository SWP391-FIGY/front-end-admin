import { Button, Dropdown } from "flowbite-react";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";

export const logColumns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Bird ID",
    selector: (row) => row.birdId,
    sortable: true,
  },
  {
    name: "Cage ID",
    selector: (row) => row.cageId,
    sortable: true,
  },
  {
    name: "Date",
    selector: (row) => row.date,
	sortable: true,
  },
  {
    name: "Description",
    selector: (row) => row.description,
	sortable: true,
  },

  {
    name: "Action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        <Link href={`/bird-log/edit/${row.id}`}>
          <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
        </Link>
        <Link href={`/bird-log/details/${row.id}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];
