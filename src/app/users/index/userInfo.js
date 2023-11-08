import { Button, Dropdown } from "flowbite-react";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";

export const userColumns = [
  {
    name: "id",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Phone Number",
    selector: (row) => row.phoneNumber,
	sortable: true,
  },
  {
    name: "Role",
    selector: (row) => {
      const statusMapping = {
        0: "Super admin",
        1: "Admin",
        2: "Manager",
        3: "Staff"
      };
      return statusMapping[row.role] || "Unknown";
    },
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => {
      const statusMapping = {
        1: "Activated",
        2: "Deactivated",
      };
      return statusMapping[row.status] || "Unknown";
    },
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        <Link href={`/users/edit/${row.id}`}>
          <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
        </Link>
        <Link href={`/users/details/${row.id}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];

export const userRoleEnums = [
  "Admin",
  "Manager",
  "Staff"
]