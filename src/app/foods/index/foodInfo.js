import { Button, Dropdown } from "flowbite-react";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";

export const foodColumns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Nutritional Ingredients",
    selector: (row) => row.nutritionalIngredients,
    sortable: true,
  },
  {
    name: "Storage Condition",
    selector: (row) => row.storageCondition,
	sortable: true,
  },
  {
    name: "Unit",
    selector: (row) => row.unit,
	sortable: true,
  },
  {
    name: "Standard Price",
    selector: (row) => `${row.standardPrice.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    })} VND`,
    sortable: true,
  },
  {
    name: "Safety Threshold",
    selector: (row) => row.safetyThreshold,
  },
  {
    name: "Action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        <Link href={`/foods/edit/${row.id}`}>
          <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
        </Link>
        <Link href={`/foods/details/${row.id}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];
