import { Button, Dropdown } from "flowbite-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";

export const birdColumns = [
  {
    name: "Id",
    selector: (row) => row.ID,
    sortable: true,
    width: '50px',
  },
  {
    name: "Birthdate",
    selector: (row) => moment(row.DoB).format('DD/MM/YYYY'),
    sortable: true,
    width: '100px',
  },
  {
    name: "Gender",
    selector: (row) => row.Gender,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row) => row.Description,
    wrap:true,
  },
  {
    name: "Image",
    cell: (row) => (
       <Image src={row.BirdImageUrl} width={100} height={100} className="object-cover h-48 w-96"/>
    ),
  },
  {
    name: "Status",
    selector: (row) => birdStatusEnum[row.BirdStatus],
    sortable: true,
  },
  {
    name: "Last Modified",
    selector: (row) => moment(row.LastModifyDate).format('DD/MM/YYYY'),
    sortable: true,
    wrap:true,
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
  "Other",
  "Cancel"
]