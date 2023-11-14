import { userRoleEnums } from "@/app/users/index/userInfo";
import { getUserInfo } from "@/helper";
import { Button, Dropdown } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { GiSoundOn } from "react-icons/gi";

const user = getUserInfo();
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
    wrap: true,
  },
  {
    name: "Size (cm)",
    selector: (row) => row.size,
    sortable: true,
  },
  {
    name: "Voice",
    cell: (row) => (
      <Link href={row.voice}>
        <GiSoundOn />
      </Link>
    ),
  },
  {
    name: "Image Link",
    cell: (row) => <Image src={row.imageLink} width={100} height={100} />,
  },
  {
    name: "Life Expectancy (Year)",
    selector: (row) => row.lifeExpectancy,
  },
  {
    name: "Habitat",
    selector: (row) => row.habitat,
    wrap: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        {user && userRoleEnums[user.role] !== "Staff" && (
          <Link href={`/species/edit/${row.id}`}>
            <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
          </Link>
        )}
        <Link href={`/species/details/${row.id}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];
