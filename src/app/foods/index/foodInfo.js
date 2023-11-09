import { Button, Dropdown } from "flowbite-react";
import moment from "moment";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";

export const foodColumns = [
  {
    name: "ID",
    selector: (row) => row.ID,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.Name,
    sortable: true,
  },
  {
    name: "Nutritional Ingredients",
    selector: (row) => row.NutritionalIngredients,
    sortable: true,
  },
  {
    name: "Storage Condition",
    selector: (row) => row.StorageCondition,
	sortable: true,
  },
  {
    name: "Unit",
    selector: (row) => row.Unit,
	sortable: true,
  },
  {
    name: "Standard Price",
    selector: (row) => `${row.StandardPrice.toLocaleString(undefined, {
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

export const inventoryLogColumns = [
  {
    name: "Create Date",
    selector: (row) => moment(row.CreateDate).format("DD/MM/YYYY hh:mm"),
  },
  {
    name: "Quantity",
    selector: (row) => row.Quantity,
  },
  {
    name: "Type",
    selector: (row) => row.Type,
  },
  {
    name: "Status",
    selector: (row) => row.Status,
  },
]
