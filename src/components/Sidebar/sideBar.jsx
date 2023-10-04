'use client'

const { Sidebar } = require("flowbite-react")
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';


const PageSidebar = () => {

  const SidebarData = [
    {
      title: "Dashboard",
      icon: <HiChartPie />
    },
    {
      title: "Kanban",
      icon: <HiViewBoards />
    },
    {
      title: "Dashboard",
      icon: <HiChartPie />
    },
    {
      title: "Kanban",
      icon: <HiViewBoards />
    },
  ]
  return (
    <Sidebar aria-label="Default sidebar example" className='h-[100vh]'>
      <div className='flex flex-col justify-between h-full'>
        <Sidebar.Items aria-label="Default Items example">
          <Sidebar.ItemGroup aria-label="Default ItemGroup example">
            <Sidebar.Item
              href="#"
              icon={HiChartPie}
            >
              <p>
                Dashboard
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiViewBoards}
              label="Pro"
              labelColor="dark"
            >
              <p>
                Kanban
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiInbox}
              label="3"
            >
              <p>
                Inbox
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiUser}
            >
              <p>
                Users
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiShoppingBag}
            >
              <p>
                Products
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiArrowSmRight}
            >
              <p>
                Sign In
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiTable}
            >
              <p>
                Sign Up
              </p>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <Sidebar.Items aria-label="Default Items example">
          <Sidebar.ItemGroup aria-label="Default ItemGroup example">
            
            <Sidebar.Item
              href="#"
              icon={HiArrowSmRight}
            >
              <p>
                Sign In
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiTable}
            >
              <p>
                Sign Up
              </p>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </div>
    </Sidebar>
  )
}

export default PageSidebar