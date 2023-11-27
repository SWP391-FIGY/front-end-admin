'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { Dropdown, Sidebar } from 'flowbite-react';
import { HiUserCircle } from 'react-icons/hi';

import { getUserInfo, removeToken, removeUserInfo } from '@/helper';

import { topSideBarData } from './topSideBarData';

const PageSidebar = () => {
  const router = useRouter();
  const currentPathName = usePathname();
  const currentBasePath = currentPathName.split('/')[1];

  const userInfo = getUserInfo();

  const handleLogout = () => {
    removeToken();
    removeUserInfo();
    router.push('/auth/login');
  };

  return (
    <Sidebar aria-label="Default sidebar example" className="min-h-[100vh">
      <div className="flex flex-col justify-between h-full overflow-auto">
        <Sidebar.Items aria-label="Default Items example" className="w-full">
          <Sidebar.ItemGroup className="w-full ">
            {topSideBarData.map((item, index) => {
              if (userInfo && item.allowRole.includes(userInfo.role)) {
                // *Check list navbar
                if (Array.isArray(item.items)) {
                  return (
                    <Sidebar.Collapse
                      key={index}
                      icon={item.icon} // Change the icon as needed
                      // onClick={() => router.push(item.href)}
                      label={item.title || 'Sub Items'}
                    >
                      {item.items.map((subItem, subIndex) => {
                        const navBasePath = subItem.href.split('/')[1];
                        const activeRouteDecoration = currentBasePath === navBasePath ? 'bg-gray-200' : '';
                        if (userInfo && subItem.allowRole.includes(userInfo.role)) {
                          return (
                            <Sidebar.Item
                              key={subIndex}
                              icon={subItem.icon}
                              onClick={() => router.push(subItem.href)}
                              className={`justify-start  cursor-pointer ${activeRouteDecoration}`}
                            >
                              <p className="overflow-clip">{subItem.title}</p>
                            </Sidebar.Item>
                          );
                        }
                      })}
                    </Sidebar.Collapse>
                  );
                }
                // *Check item navbar
                else {
                  const navBasePath = item.href.split('/')[1];
                  const activeRouteDecoration = currentBasePath === navBasePath ? 'bg-gray-200' : '';
                  if (userInfo && item.allowRole.includes(userInfo.role)) {
                    return (
                      <Sidebar.Item
                        key={index}
                        onClick={() => {
                          router.push(item.href);
                        }}
                        icon={item.icon}
                        className={`justify-start ${activeRouteDecoration}`}
                      >
                        <p className="overflow-clip">{item.title}</p>
                      </Sidebar.Item>
                    );
                  }
                }
              }
            })}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <Sidebar.Items aria-label="User info management">
          {userInfo ? (
            <>
              <Dropdown
                dismissOnClick={false}
                arrowIcon={false}
                inline
                label={
                  <div className="flex gap-4">
                    <Image height={30} width={30} src={'https://cdn-icons-png.flaticon.com/512/666/666201.png'} />
                    {userInfo.fullName}
                  </div>
                }
              >
                <Dropdown.Item>
                  <div>Hello {userInfo && userInfo.fullName}</div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div>Role {userInfo.role}</div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div onClick={() => router.push(`/profile/edit/${userInfo.id}`)}>Manage Account</div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <div onClick={handleLogout}>Log out</div>
                </Dropdown.Item>
              </Dropdown>
            </>
          ) : (
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/auth/login" icon={HiUserCircle}>
                <p>Login</p>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          )}
        </Sidebar.Items>
      </div>
    </Sidebar>
  );
};

export default PageSidebar;
