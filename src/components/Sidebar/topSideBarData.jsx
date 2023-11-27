import { BsUiChecksGrid } from 'react-icons/bs';
import { FaAppleWhole } from 'react-icons/fa6';
import { GiCage } from 'react-icons/gi';
import {
  HiArrowSmRight,
  HiCalendar,
  HiChartPie,
  HiCheckCircle,
  HiDatabase,
  HiInbox,
  HiOutlineClipboardList,
  HiShoppingBag,
  HiShoppingCart,
  HiUserCircle,
  HiViewBoards,
} from 'react-icons/hi';
import { MdPets } from 'react-icons/md';
import { PiBirdFill, PiBowlFoodFill } from 'react-icons/pi';

export const topSideBarData = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: HiChartPie,
    allowRole: ['Admin', 'Manager', 'Staff'],
  },
  {
    title: 'Bird Management',
    icon: MdPets,
    allowRole: ['Admin', 'Manager', 'Staff'],
    items: [
      {
        title: 'Cage',
        href: '/cage/index',
        icon: GiCage,
        allowRole: ['Admin', 'Manager', 'Staff'],
      },
      {
        title: 'Bird',
        href: '/birds/index',
        icon: PiBirdFill,
        allowRole: ['Admin', 'Manager', 'Staff'],
      },
      {
        title: 'Species',
        href: '/species/index',
        icon: MdPets,
        allowRole: ['Admin', 'Manager', 'Staff'],
      },
    ],
  },
  {
    title: 'Plan Management',
    icon: HiCalendar,
    allowRole: ['Admin', 'Manager', 'Staff'],
    items: [
      {
        title: 'Task',
        href: '/tasks/index',
        icon: HiCheckCircle,
        allowRole: ['Admin', 'Manager', 'Staff'],
      },
      {
        title: 'Food',
        href: '/foods/index',
        icon: FaAppleWhole,
        allowRole: ['Admin', 'Manager', 'Staff'],
      },      
      {
        title: 'Menu',
        href: '/menu/index',
        icon: HiDatabase,
        allowRole: ['Admin', 'Manager', 'Staff'],
      },
    ],
  },
  {
    title: 'User',
    href: '/users/index',
    icon: HiUserCircle,
    allowRole: ['Admin'],
  },
];
