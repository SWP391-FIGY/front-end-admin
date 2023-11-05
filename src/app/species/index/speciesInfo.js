import { Button, Dropdown } from "flowbite-react";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";

export const speciesColumns = [
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
    name: "Color",
    selector: (row) => row.color,
    sortable: true,
  },
  {
    name: "Size",
    selector: (row) => row.size,
	sortable: true,
  },
  {
    name: "Voice",
    cell: (row) => (
      <iframe src={row.voice} 
      style={{ width: '100px', height: 'auto' }}
      />
   ),

  },
  {
    name: "Image Link",
    cell: (row) => (
      <img src={row.imageLink} 
      style={{ width: '100px', height: 'auto' }}
      />
   ),
  },
  {
    name: "Life Expectancy",
    selector: (row) => row.lifeExpectancy,
  },
  {
    name: "Habitat",
    selector: (row) => row.habitat,
  },
  {
    name: "Action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        <Link href={`/species/edit/${row.id}`}>
          <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
        </Link>
        <Link href={`/species/details/${row.id}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];

