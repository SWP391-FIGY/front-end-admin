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
    href: "/dashboard",
    icon: HiChartPie,
    allowRole: ["Admin", "Manager", "Staff"],
  },
  {
    title: "Bird Management",
    icon: MdPets,
    allowRole: ["Admin", "Manager", "Staff"],
    items: [
      {
        title: "Bird",
        href: "/birds/index",
        icon: PiBirdFill,
        allowRole: ["Admin", "Manager", "Staff"],
      },
      {
        title: "Species",
        href: "/species/index",
        icon: MdPets,
        allowRole: ["Admin", "Manager"],
      },
      {
        title: "Cage",
        href: "/cage/index",
        icon: GiCage,
        allowRole: ["Admin", "Manager", "Staff"],
      },
    ],
  },
  {
    title: "Plan Management",
    icon: HiCalendar,
    allowRole: ["Admin", "Manager", "Staff"],
    items: [
      {
        title: "Task",
        href: "/tasks/index",
        icon: HiCheckCircle,
        allowRole: ["Admin", "Manager", "Staff"],
      },
      {
        title: "Food",
        href: "/foods/index",
        icon: FaAppleWhole,
        allowRole: ["Admin", "Manager", "Staff"],
      },
      {
        title: "Feeding Plan",
        href: "/feeding-plan/index",
        icon: BsUiChecksGrid,
        allowRole: ["Admin", "Manager"],
      },
      {
        title: "Menu",
        href: "/menu/index",
        icon: HiDatabase,
        allowRole: ["Admin", "Manager"],
      },
    ],                                
  },
  {
    title: "Purchase Management",
    icon: HiShoppingCart,
    allowRole: ["Admin", "Manager"],
    items: [
      {
        title: "Purchase Request",
        href: "/purchase-request/index",
        icon: HiShoppingCart,
        allowRole: ["Admin", "Manager"],
      },
      {
        title: "Purchase Order",
        href: "/purchase-order/index",
        icon: HiOutlineClipboardList,
        allowRole: ["Admin", "Manager"],
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
