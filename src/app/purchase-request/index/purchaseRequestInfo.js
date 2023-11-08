import { Dropdown } from "flowbite-react";
import moment from "moment";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical } from "react-icons/fi";



export const purchaseRequestColumns = [
  {
    name: "ID",
    selector: (row) => row.ID,
    sortable: true,
  },
  {
    name: "Creator Staff",
    selector: (row) => row.Creator.Name,
    sortable: true,
  },
  {
    name: "Created Date",
    selector: (row) => moment(row.DateTime).format('DD/MM/YYYY')
  },
  {
    name: "Status",
    selector: (row) => purchaseRequestStatusEnum[row.Status],
  },
  
  {
    name: "Action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />} placement="bottom" className="absolute top-[100%] left-0 z-3">
        <Link href={`/purchase-request/edit/${row.ID}`}>
          <Dropdown.Item icon={FiEdit} className="min-w-[250px]">Edit</Dropdown.Item>
        </Link>
        <Link href={`/purchase-request/details/${row.ID}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
        <Link href={`/purchase-order/create/${row.ID}`}>
          <Dropdown.Item icon={FiEye}>Create purchase orders</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];

export const purchaseRequestDetailColumns = [
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

export const purchaseRequestStatusEnum = [
  
  "Not Post",
  "Post",
  "Cancel",
]