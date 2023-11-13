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
import { FaAppleWhole } from "react-icons/fa6";
import { GiCage } from "react-icons/gi";
import { PiBirdFill, PiBowlFoodFill } from "react-icons/pi";
import { MdPets } from "react-icons/md";
import { BsUiChecksGrid } from "react-icons/bs";

export const topSideBarData = [
  {
    title: "Dashboard",
    href: "/",
    icon: HiChartPie,
    allowRole: ["Manager", "Staff"],
  },
  {
    title: "Bird Management",
    icon: MdPets,
    allowRole: ["Manager", "Staff"],
    items: [
      {
        title: "Bird",
        href: "/birds/index",
        icon: PiBirdFill,
        allowRole: ["Manager", "Staff"],
      },
      {
        title: "Species",
        href: "/species/index",
        icon: MdPets,
        allowRole: ["Manager"],
      },
      {
        title: "Cage",
        href: "/cage/index",
        icon: GiCage,
        allowRole: ["Manager", "Staff"],
      },
    ],
  },
  {
    title: "Plan Management",
    icon: HiCalendar,
    allowRole: ["Manager", "Staff"],
    items: [
      {
        title: "Task",
        href: "/tasks/index",
        icon: HiCheckCircle,
        allowRole: ["Manager", "Staff"],
      },
      {
        title: "Food",
        href: "/foods/index",
        icon: FaAppleWhole,
        allowRole: ["Manager", "Staff"],
      },
      {
        title: "Feeding Plan",
        href: "/feeding-plan/index",
        icon: BsUiChecksGrid,
        allowRole: ["Manager"],
      },
      {
        title: "Menu",
        href: "/menu/index",
        icon: HiDatabase,
        allowRole: ["Manager"],
      },
    ],                                
  },
  {
    title: "Purchase Management",
    icon: HiShoppingCart,
    allowRole: ["Manager"],
    items: [
      {
        title: "Purchase Request",
        href: "/purchase-request/index",
        icon: HiShoppingCart,
        allowRole: ["Manager"],
      },
      {
        title: "Purchase Order",
        href: "/purchase-order/index",
        icon: HiOutlineClipboardList,
        allowRole: ["Manager"],
      },
    ],
  },
  {
    title: "User",
    href: "/users/index",
    icon: HiUserCircle,
    allowRole: ["Admin"],
  },
];
