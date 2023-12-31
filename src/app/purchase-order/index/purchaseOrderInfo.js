import { Dropdown } from "flowbite-react";
import moment from "moment";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical } from "react-icons/fi";

export const purchaseOrderInfo = [
  {
    id: 1,
    managerId: 1,
    purchaseRequestId: 1,
    createdDate: "10/04/2023",
    status: 1,
    note: "Preparing"
  },
  {
    id: 2,
    managerId: 1,
    purchaseRequestId: 2,
    createdDate: "10/04/2023",
    status: 1,
    note: "Preparing"
  },
  {
    id: 3,
    managerId: 1,
    purchaseRequestId: 3,
    createdDate: "10/04/2023",
    status: 1,
    note: "Canceled"
  },
  {
    id: 4,
    managerId: 1,
    purchaseRequestId: 4,
    createdDate: "10/04/2023",
    status: 1,
    note: "Canceled"
  },
  {
    id: 5,
    managerId: 1,
    purchaseRequestId: 5,
    createdDate: "10/04/2023",
    status: 1,
    note: "Delivering"
  },
  {
    id: 6,
    managerId: 1,
    purchaseRequestId: 6,
    createdDate: "10/04/2023",
    status: 1,
    note: "Delivering"
  },
  {
    id: 7,
    managerId: 1,
    purchaseRequestId: 7,
    createdDate: "10/04/2023",
    status: 1,
    note: "Overdued"
  },
  {
    id: 8,
    managerId: 1,
    purchaseRequestId: 8,
    createdDate: "10/04/2023",
    status: 1,
    note: "Overdued"
  },
  {
    id: 9,
    managerId: 1,
    purchaseRequestId: 9,
    createdDate: "10/04/2023",
    status: 1,
    note: "Returned"
  },
  {
    id: 10,
    managerId: 1,
    purchaseRequestId: 10,
    createdDate: "10/04/2023",
    status: 1,
    note: "Done"
  },
];

export const purchaseOrderDetailInfo = [
  {
    id: 1,
    purchaseOrderId: 1,
    foodId: 2,
    quantity: 10,
    unit: 10,
    NETPrice: 100,
    deliverDate: "10/04/2023"
  },
  {
    id: 1,
    purchaseOrderId: 1,
    foodId: 1,
    quantity: 10,
    unit: 10,
    NETPrice: 100,
    deliverDate: "10/04/2023"
  },
  {
    id: 1,
    purchaseOrderId: 1,
    foodId: 3,
    quantity: 10,
    unit: 10,
    NETPrice: 100,
    deliverDate: "10/04/2023"
  },
];

export const purchaseOrderColumns = [
  {
    name: "ID",
    selector: (row) => row.ID,
    sortable: true,
  },
  {
    name: "Manager Name",
    selector: (row) => row.Creator.Name,
    sortable: true,
  },
  {
    name: "Purchase Request ID",
    selector: (row) => row.PurchaseRequestID,
  },
  {
    name: "Created Date",
    selector: (row) => moment(row.CreateDate).format('DD/MM/YYYY'),
  },
  {
    name: "Status",
    selector: (row) => {
      const statusMapping = {
        1: "Prepare",
        2: "Cancel",
        3: "Delivering",
        4: "Overdue",
        5: "Returned",
        6: "Done"
      };
      return statusMapping[row.status] || "Unknown";
    },
    sortable: true,
  },
  {
    name: "Note",
    selector: (row) => row.note,
  },
  
  {
    name: "Action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        {/* <Link href={`/purchase-order/edit/${row.id}`}>
          <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
        </Link> */}
        <Link href={`/purchase-order/details/${row.id}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];

export const purchaseOrderDetailColumns = [
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
    name: "Unit",
    selector: (row) => row.unit,
    sortable: true,
  },
  {
    name: "NET Price",
    selector: (row) => row.NETPrice,
    sortable: true,
  },
  {
    name: "Deliver Date",
    selector: (row) => row.deliverDate,
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

export const purchaseOrderStatusEnum = [
  "Prepare",
  "Cancel",
  "Delivery",
  "Overdue",
  "Return",
  "Done",
]