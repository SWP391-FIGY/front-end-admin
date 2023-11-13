import { Button, Dropdown } from "flowbite-react";
import moment from "moment";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";

export const taskColumns = [
  {
    name: "ID",
    selector: (row) => row.ID,
    sortable: true,
    width: "50px",
  },
  {
    name: "Bird ID",
    selector: (row) => row.BirdID,
    sortable: true,
    width: "70px",
  },
  {
    name: "Cage",
    selector: (row) => row.CageID,
    sortable: true,
    width: "70px",
  },
  {
    name: "Staff",
    selector: (row) => row.Staff.Name,
    width: "80px",
    wrap: true,
  },
  {
    name: "Task Name",
    selector: (row) => row.TaskName,
  },
  {
    name: "Deadline",
    selector: (row) => moment(row.DateTime).format("DD/MM/YYYY HH:mm"),
    sortable: true,
    width: "150px",
  },
  {
    name: "Description",
    selector: (row) => row.Description,
    width: "150px",
    wrap: true,
  },
  {
    name: "Status",
    selector: (row) => row.Status,
  },
  {
    name: "Action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        {user && userRoleEnums[user.role] !== "Staff" && (
          <Link href={`/tasks/edit/${row.ID}`}>
            <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
          </Link>
        )}
        <Link href={`/tasks/details/${row.ID}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];

export const taskStatusEnum = ["Not Assign", "Pending", "Done", "Cancel"];

function formatDateTime(dateTime) {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // Display in 12-hour format
  };
  return new Date(dateTime).toLocaleString("en-US", options);
}
