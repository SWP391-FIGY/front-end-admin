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
    selector: (row) => row.MealMenu.MenuName,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row) => row.Description,
  },  
  {
    name: "DateTime",
    selector: (row) => formatDateTime(row.DateTime),
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

export const planStatusEnum = [
  "Upcoming",
  "Ongoing",
  "Fed",
  "Overdue",
  "Other",
  "Cancel"
]

function formatDateTime(DateTime) {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // Display in 12-hour format
  };
  return new Date(DateTime).toLocaleString("en-US", options);
}


