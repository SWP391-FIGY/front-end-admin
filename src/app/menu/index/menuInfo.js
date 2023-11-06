import { Button, Dropdown } from "flowbite-react";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";


const getBirdStatusText = (value) => {
  return value === 1 ? "Assigned" : value === 2 ? "Not assigned" : "";
};

const getMenuStatusText = (value) => {
  return value === 1 ? "In use" : value === 2 ? "Not in use" : "";
};
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
    name: "Species",
    selector: (row) => row.Species.name,
    sortable: true,
  },
  {
    name: "Min Days Before Feeding",
    selector: (row) => row.daysBeforeFeeding,
    sortable: true,
  },
  {
    name: "Size",
    selector: (row) => row.size,
	sortable: true,
  },
  {
    name: "Bird status",
    selector: (row) => getBirdStatusText(row.birdStatus),
    sortable: true,
  },
  {
    name: "Menu status",
    selector: (row) => getMenuStatusText(row.menuStatus),
    sortable: true,
  },
  {

    name: "Nutritional ingredients",
    selector: (row) => row.nutritionalIngredients,
	sortable: true,
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