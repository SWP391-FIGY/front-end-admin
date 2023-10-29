import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiCheckCircle,
  HiDatabase,
  HiViewBoards,
  HiCalendar,
  HiShoppingCart,
  HiOutlineClipboardList,
  HiUserCircle,

} from "react-icons/hi";
import {GiCage} from 'react-icons/gi'
import {PiBirdFill, PiBowlFoodFill} from 'react-icons/pi'
import { MdPets } from "react-icons/md";
import { BsUiChecksGrid } from 'react-icons/bs'

export const topSideBarData = [
  {
    title: "Dashboard",
    href: "/",
    icon: HiChartPie,
    allowRole: [],
  },
  {
    title: "Bird Management",
    icon: MdPets,
    items: [
      {
        title: "Bird",
        href: "/birds/index",
        icon: PiBirdFill,
        allowRole: [],
      },
      {
        title: "Species",
        href: "/species/index",
        icon: MdPets,
        allowRole: [],
      },
      {
        title: "Cage",
        href: "/cage/index",
        icon: GiCage,
        allowRole: [],
      },
    ],
  },
  {
    title: "Plan Management",
    icon: HiCalendar,
    items: [
      {
        title: "Task",
        href: "/tasks/index",
        icon: HiCheckCircle,
        allowRole: [],
      },
      {
        title: "Food",
        href: "/foods/index",
        icon: PiBowlFoodFill,
        allowRole: [],
      },
      {
        title: "Feeding Plan",
        href: "feeding-plan/index",
        icon: BsUiChecksGrid,
        allowRole: [],
      },
      {
        title: "Menu",
        href: "menu/index",
        icon: HiDatabase,
        allowRole: [],
      },
    ],
  },
  {
    title: "Purchase Management",
    icon: HiShoppingCart,
    items: [
      {
        title: "Purchase Request",
        href: "#",
        icon: HiShoppingCart,
        allowRole: [],
      },
      {
        title: "Purchase Order",
        href: "#",
        icon: HiOutlineClipboardList,
        allowRole: [],
      },
      {
        title: "User",
        href: "/users/index",
        icon: HiUserCircle,
        allowRole: [],
      },
    ],
  },
];
