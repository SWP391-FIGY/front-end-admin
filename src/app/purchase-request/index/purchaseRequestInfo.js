import { Dropdown } from "flowbite-react";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical } from "react-icons/fi";

export const purchaseRequestInfo = [
  {
    id: 1,
    menuName: "Menu 1",
    age: 4,
    size: "small",
    birdStatus: 1,
    menuStatus: 1,
    nutritionalIngredients: "",
    speciesId: 1,
  },
  {
    id: 2,
    menuName: "Menu 2",
    age: 4,
    size: "small",
    birdStatus: 1,
    menuStatus: 1,
    nutritionalIngredients: "",
    speciesId: 1,
  },
  {
    id: 3,
    menuName: "Menu 3",
    age: 4,
    size: "small",
    birdStatus: 1,
    menuStatus: 1,
    nutritionalIngredients: "",
    speciesId: 1,
  },
  {
    id: 4,
    menuName: "Menu 4",
    age: 4,
    size: "small",
    birdStatus: 1,
    menuStatus: 1,
    nutritionalIngredients: "",
    speciesId: 1,
  },
  {
    id: 5,
    menuName: "Menu 5",
    age: 4,
    size: "small",
    birdStatus: 1,
    menuStatus: 1,
    nutritionalIngredients: "",
    speciesId: 1,
  },
  {
    id: 6,
    menuName: "Menu 6",
    age: 4,
    size: "small",
    birdStatus: 1,
    menuStatus: 1,
    nutritionalIngredients: "",
    speciesId: 1,
  },
  {
    id: 7,
    menuName: "Menu 7",
    age: 4,
    size: "small",
    birdStatus: 1,
    menuStatus: 1,
    nutritionalIngredients: "",
    speciesId: 1,
  },
  {
    id: 8,
    menuName: "Menu 8",
    age: 4,
    size: "small",
    birdStatus: 1,
    menuStatus: 1,
    nutritionalIngredients: "",
    speciesId: 1,
  },
  {
    id: 9,
    menuName: "Menu 9",
    age: 4,
    size: "small",
    birdStatus: 1,
    menuStatus: 1,
    nutritionalIngredients: "",
    speciesId: 1,
  },
  {
    id: 10,
    menuName: "Menu 10",
    age: 4,
    size: "small",
    birdStatus: 1,
    menuStatus: 1,
    nutritionalIngredients: "",
    speciesId: 1,
  },
  {
    id: 11,
    menuName: "Menu 11",
    age: 4,
    size: "small",
    birdStatus: 1,
    menuStatus: 1,
    nutritionalIngredients: "",
    speciesId: 1,
  },
  {
    id: 12,
    menuName: "Menu 12",
    age: 4,
    size: "small",
    birdStatus: 1,
    menuStatus: 1,
    nutritionalIngredients: "",
    speciesId: 1,
  },
  {
    id: 13,
    menuName: "Menu 13",
    age: 4,
    size: "small",
    birdStatus: 1,
    menuStatus: 1,
    nutritionalIngredients: "",
    speciesId: 1,
  },
];

export const purchaseRequestDetailInfo = [
  {
    id: 1,
    purchaseRequestId: 1,
    foodId: 2,
    quantity: 10,
  },
  {
    id: 2,
    purchaseRequestId: 1,
    foodId: 1,
    quantity: 10,
  },
  {
    id: 3,
    purchaseRequestId: 1,
    foodId: 3,
    quantity: 10,
  },
];

export const purchaseRequestColumns = [
  {
    name: "Name",
    selector: (row) => row.menuName,
    sortable: true,
  },
  {
    name: "Age",
    selector: (row) => row.age,
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
    name: "Species Id",
    selector: (row) => row.speciesId,
  },
  {
    name: "Action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        <Link href={`/purchaseRequest/edit/${row.id}`}>
          <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
        </Link>
        <Link href={`/purchaseRequest/details/${row.id}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];

export const purchaseRequestDetailColumns = [
  {
    name: "Food",
    selector: (row) => row.foodId,
    sortable: true,
  },
  {
    name: "Quantity",
    selector: (row) => row.quantity,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
        <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
      </Dropdown>
    ),
  },
];
