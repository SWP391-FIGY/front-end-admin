import { Dropdown } from "flowbite-react";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical } from "react-icons/fi";

export const purchaseRequestInfo = [
  {
    id: 1,
    creatorId: 1,
    createdDate: "10/04/2023",
    status: "not post",
  },
  {
    id: 2,
    creatorId: 1,
    createdDate: "10/04/2023",
    status: "not post",
  },
  {
    id: 3,
    creatorId: 1,
    createdDate: "11/04/2023",
    status: "posted",
  },
  {
    id: 4,
    creatorId: 2,
    createdDate: "11/04/2023",
    status: "posted",
  },
  {
    id: 5,
    creatorId: 2,
    createdDate: "11/04/2023",
    status: "cancel",
  },
  {
    id: 6,
    creatorId: 1,
    createdDate: "11/04/2023",
    status: "posted",
  },
  {
    id: 7,
    creatorId: 1,
    createdDate: "11/04/2023",
    status: "posted",
  },
  {
    id: 8,
    creatorId: 1,
    createdDate: "11/04/2023",
    status: "posted",
  },
  {
    id: 9,
    creatorId: 1,
    createdDate: "11/04/2023",
    status: "posted",
  },
  {
    id: 10,
    creatorId: 1,
    createdDate: "11/04/2023",
    status: "posted",
  },
  {
    id: 11,
    creatorId: 1,
    createdDate: "11/04/2023",
    status: "posted",
  },
  {
    id: 12,
    creatorId: 1,
    createdDate: "11/04/2023",
    status: "posted",
  },
  {
    id: 13,
    creatorId: 1,
    createdDate: "11/04/2023",
    status: "posted",
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
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Creator ID",
    selector: (row) => row.creatorId,
    sortable: true,
  },
  {
    name: "Created Date",
    selector: (row) => row.createdDate,
  },
  {
    name: "Status",
    selector: (row) => row.status,
  },
  
  {
    name: "Action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        <Link href={`/purchase-request/edit/${row.id}`}>
          <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
        </Link>
        <Link href={`/purchase-request/details/${row.id}`}>
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
