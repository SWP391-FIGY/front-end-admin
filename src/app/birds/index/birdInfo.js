import { Button, Dropdown } from "flowbite-react";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";

export const birdColumns = [
  {
    name: "Id",
    selector: (row) => row.ID,
    sortable: true,
  },
  {
    name: "Birthdate",
    selector: (row) => row.DoB,
    sortable: true,
  },
  {
    name: "Gender",
    selector: (row) => row.Gender,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row) => row.Description,
  },
  {
    name: "Image",
    cell: (row) => (
       <img src={row.BirdImageUrl} />
      //<img src={'https://lzd-img-global.slatic.net/g/p/f7b20a2fb888c62c1ba20b3c156ba6f0.jpg_720x720q80.jpg'} />
    ),
  },
  {
    name: "Status",
    selector: (row) => row.BirdStatus,
    sortable: true,
  },
  {
    name: "Last Modified",
    selector: (row) => row.LastModifyDate,
    sortable: true,
  },
  {
    name: "Species",
    selector: (row) => row.Species.Name,
    sortable: true,
  },
  {
    name: "Cage",
    selector: (row) => row.Cage.ID,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        <Link href={`/birds/edit/${row.ID}`}>
          <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
        </Link>
        <Link href={`/birds/details/${row.ID}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];

export const birdStatusEnum = [
  "Active",
  "Dead",
  "Sick",
  "Molt",
  "Sold",
  "Other"
]