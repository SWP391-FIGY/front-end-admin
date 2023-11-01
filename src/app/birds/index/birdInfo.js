import { Button, Dropdown } from "flowbite-react";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";

export const birdInfo = [
  {
    id: 1,
    name: "bird 1",
    speciesId: 1,
    cageId: 1,
    birthDate: "10/04/2023",
    gender: "Male",
    status: "OK",
  },
  {
    id: 2,
    name: "bird 2",
    speciesId: 1,
    cageId: 1,
    birthDate: "10/04/2023",
    gender: "Male",
    status: "OK",
  },
  {
    id: 3,
    name: "bird 3",
    speciesId: 1,
    cageId: 1,
    birthDate: "10/04/2023",
    gender: "Male",
    status: "OK",
  },
  {
    id: 4,
    name: "bird 4",
    speciesId: 1,
    cageId: 1,
    birthDate: "10/04/2023",
    gender: "Male",
    status: "OK",
  },
  {
    id: 5,
    name: "bird 5",
    speciesId: 1,
    cageId: 1,
    birthDate: "10/04/2023",
    gender: "Male",
    status: "OK",
  },
  {
    id: 6,
    name: "bird 6",
    speciesId: 1,
    cageId: 1,
    birthDate: "10/04/2023",
    gender: "Male",
    status: "OK",
  },
  {
    id: 7,
    name: "bird 7",
    speciesId: 1,
    cageId: 1,
    birthDate: "10/04/2023",
    gender: "Male",
    status: "OK",
  },
  {
    id: 8,
    name: "bird 8",
    speciesId: 1,
    cageId: 1,
    birthDate: "10/04/2023",
    gender: "Male",
    status: "OK",
  },
  {
    id: 9,
    name: "bird 9",
    speciesId: 1,
    cageId: 1,
    birthDate: "10/04/2023",
    gender: "Male",
    status: "OK",
  },
  {
    id: 10,
    name: "bird 10",
    speciesId: 1,
    cageId: 1,
    birthDate: "10/04/2023",
    gender: "Male",
    status: "OK",
  },
  {
    id: 11,
    name: "bird 11",
    speciesId: 1,
    cageId: 1,
    birthDate: "10/04/2023",
    gender: "Male",
    status: "OK",
  },
  {
    id: 12,
    name: "bird 12",
    speciesId: 1,
    cageId: 1,
    birthDate: "10/04/2023",
    gender: "Male",
    status: "OK",
  },
  {
    id: 13,
    name: "bird 13",
    speciesId: 1,
    cageId: 1,
    birthDate: "10/04/2023",
    gender: "Male",
    status: "OK",
  },
];

export const birdColumns = [
  {
    name: "Id",
    selector: (row) => row.ID,
    sortable: true,
  },
  {
    name: "Species",
    selector: (row) => row.Species.Name,
    sortable: true,
  },
  {
    name: "Cage",
    selector: (row) => row.CageId,
    sortable: true,
  },
  {
    name: "Birth Date",
    selector: (row) => row.DoB,
  },
  {
    name: "Gender",
    selector: (row) => row.Gender,
  },
  {
    name: "Image",
    cell: (row) => (
      // <img src={row.BirdImageUrl} />
      <img src={'https://lzd-img-global.slatic.net/g/p/f7b20a2fb888c62c1ba20b3c156ba6f0.jpg_720x720q80.jpg'} />
    ),
  },

  {
    name: "Status",
    selector: (row) => row.BirdStatus,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        <Link href={`/birds/edit/${row.id}`}>
          <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
        </Link>
        <Link href={`/birds/details/${row.id}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];
