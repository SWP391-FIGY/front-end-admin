import { Button, Dropdown } from "flowbite-react";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";

export const cageColumns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Size",
    selector: (row) => row.size,
    sortable: true,
  },
  {
    name: "Color",
    selector: (row) => row.color,
    sortable: true,
  },
  {
    name: "Area",
    selector: (row) => row.area,
	sortable: true,
  },
  {
    name: "Type",
    selector: (row) => row.type,
	sortable: true,
  },
  {
    name: "Status",
    selector: (row) => {
      const statusMapping = {
        1: "In use",
        2: "Maintenance",
        3: "Broken",
        4: "Not in use"
      };
      return statusMapping[row.cageStatus] || "Unknown";
    },
    sortable: true,
  },
  {
    name: "Capacity",
    selector: (row) => row.capacity,
  },
  {
    name: "Action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        <Link href={`/cage/edit/${row.id}`}>
          <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
        </Link>
        <Link href={`/cage/details/${row.id}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];
