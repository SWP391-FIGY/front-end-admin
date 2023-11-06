import { Dropdown } from "flowbite-react";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical } from "react-icons/fi";

export const menuColumns = [
  {
    name: "Id",
    selector: (row) => row.ID,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.MenuName,
    sortable: true,
  },
  {
    name: "Species",
    selector: (row) => row.Species.Name,
    sortable: true,
  },
  {
    name: "Min Days Before Feeding",
    selector: (row) => row.daysBeforeFeeding,
  },
  {
    name: "Size",
    selector: (row) => row.size,
  },
  {
    name: "Bird Status",
    selector: (row) => row.birdStatus,
  },
  {
    name: "Menu Status",
    selector: (row) => row.menuStatus,
  },
  {
    name: "Nutritional Ingredients",
    selector: (row) => row.nutritionalIngredients,
  },
  {
    name: "Action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        <Link href={`/menu/edit/${row.id}`}>
          <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
        </Link>
        <Link href={`/menu/details/${row.id}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];

export const menuDetailColumns = [
  {
    name: "Food",
    selector: (row) => row.Food.Name,
    sortable: true,
  },
  {
    name: "Quantity",
    selector: (row) => row.Quantity,
    sortable: true,
  },
  
];

export const menuStatusEnum = [
  "Active",
  "Deactive",
  "Cancel",
  "Other"
]