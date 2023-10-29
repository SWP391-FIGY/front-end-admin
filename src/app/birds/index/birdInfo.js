import { Button, Dropdown } from "flowbite-react";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";


export const birdInfo = [
  {
		id:1,
    name: "bird 1",
    speciesId: 1,
    cageId: 1,
    birthDate: "10/04/2023",
    gender: "Male",
    status: "OK",
  },
  {
		id:2,
    name: "bird 2",
    speciesId: 1,
    cageId: 1,
    birthDate: "10/04/2023",
    gender: "Male",
    status: "OK",
  },
  {
		id:3,
    name: "bird 3",
    speciesId: 1,
    cageId: 1,
    birthDate: "10/04/2023",
    gender: "Male",
    status: "OK",
  },
];

export const birdColumns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Species",
    selector: (row) => row.speciesId,
    sortable: true,
  },
  {
    name: "Cage",
    selector: (row) => row.cageId,
    sortable: true,
  },
  {
    name: "Birth Date",
    selector: (row) => row.birthDate,
  },
  {
    name: "Gender",
    selector: (row) => row.gender,
  },

  {
    name: "status",
    selector: (row) => row.status,
    sortable: true,
  },
  {
    name: "action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        <Dropdown.Item icon={FiEdit}>
          <Link href={`/birds/edit/${row.id}`}>Edit</Link>
        </Dropdown.Item>
        <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
      </Dropdown>
    ),
  },
];
