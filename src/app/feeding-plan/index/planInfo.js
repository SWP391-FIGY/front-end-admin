import { Button, Dropdown } from "flowbite-react";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";

export const planColumns = [
  {
    name: "Id",
    selector: (row) => row.ID,
    sortable: true,
  },
  {
    name: "Bird ID",
    selector: (row) => row.Bird.ID,
    sortable: true,
  },
  {
    name: "Meal Menu Name",
    selector: (row) => row.Menu.MenuName,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row) => row.Description,
  },  
  {
    name: "DateTime",
    selector: (row) => row.DateTime,
    sortable: true,
  },
  {
    name: "Feeding Status",
    selector: (row) => row.FeedingStatus,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        <Link href={`/feeding-plan/edit/${row.ID}`}>
          <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
        </Link>
        <Link href={`/feeding-plan/details/${row.ID}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];


