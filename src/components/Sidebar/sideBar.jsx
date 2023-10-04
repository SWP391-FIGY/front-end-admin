'use client'

const { Sidebar } = require("flowbite-react")
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { topSideBarData } from './topSideBarData';
import { usePathname, useRouter } from 'next/navigation';


const PageSidebar = () => {
  const currentPathName = usePathname();
  const currentBasePath = currentPathName.split('/')[1];

  return (
    <Sidebar aria-label="Default sidebar example" className='h-[100vh]'>
      <div className='flex flex-col flex-wrap justify-between h-full'>
        <Sidebar.Items aria-label="Default Items example" className='w-full'>
          <Sidebar.ItemGroup className='w-full '>
            {topSideBarData.map((item, index) => {
              const navBasePath = item.href.split('/')[1];
              const activeRouteDecoration = currentBasePath === navBasePath ? 'bg-gray-200' : '';
              return (
                <Sidebar.Item
                  key={index}
                  href={item.href}
                  icon={item.icon}
                  className={`justify-start ${activeRouteDecoration}`}
                >
                  <p className='overflow-clip'>{item.title}</p>
                </Sidebar.Item>
              )
            })}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <Sidebar.Items aria-label="User info management">
          <Sidebar.ItemGroup>

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
              className='active:bg-gray-500'
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