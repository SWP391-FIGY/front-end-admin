"use client";

const { Sidebar, Dropdown } = require("flowbite-react");
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
  HiUserCircle,
} from "react-icons/hi";
import { topSideBarData } from "./topSideBarData";
import { usePathname, useRouter } from "next/navigation";
import { getUserInfo, removeToken, removeUserInfo } from "@/helper";
import { userRoleEnums } from "@/app/users/index/userInfo";
import Image from "next/image";
import Link from "next/link";

const PageSidebar = () => {
  const router = useRouter();
  const currentPathName = usePathname();
  const currentBasePath = currentPathName.split("/")[1];
  const userInfo = getUserInfo();
  console.log("Sidebar - user info", userInfo);
  const handleLogout = () => {
    removeToken();
    removeUserInfo();
    router.push("/auth/login");
  };

  return (
    <Sidebar aria-label="Default sidebar example" className="h-[100vh]">
      <div className="flex flex-col overflow-auto justify-between h-full">
        <Sidebar.Items aria-label="Default Items example" className="w-full">
          <Sidebar.ItemGroup className="w-full ">
            {topSideBarData.map((item, index) => {
              if (
                userInfo &&
                item.allowRole.includes(userRoleEnums[userInfo.role])
              ) {
                // *Check list navbar
                if (Array.isArray(item.items)) {
                  return (
                    <Sidebar.Collapse
                      key={index}
                      icon={item.icon} // Change the icon as needed
                      label={item.title || "Sub Items"}
                    >
                      {item.items.map((subItem, subIndex) => {
                        const navBasePath = subItem.href.split("/")[1];
                        const activeRouteDecoration =
                          currentBasePath === navBasePath ? "bg-gray-200" : "";
                        if (
                          userInfo &&
                          subItem.allowRole.includes(userRoleEnums[userInfo.role])
                        ) {
                          return (
                            <Sidebar.Item
                              key={subIndex}
                              href={subItem.href}
                              icon={subItem.icon}
                              className={`justify-start ${activeRouteDecoration}`}
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
                  const navBasePath = item.href.split("/")[1];
                  const activeRouteDecoration =
                    currentBasePath === navBasePath ? "bg-gray-200" : "";
                  if (
                    userInfo &&
                    item.allowRole.includes(userRoleEnums[userInfo.role])
                  ) {
                    return (
                      <Sidebar.Item
                        key={index}
                        href={item.href}
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
                    <Image
                      height={30}
                      width={30}
                      src={
                        "https://cdn-icons-png.flaticon.com/512/666/666201.png"
                      }
                    />
                    {userInfo.name}
                  </div>
                }
              >
                <Dropdown.Item>
                  <div>Hello {userInfo && userInfo.name}</div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div>Role {userRoleEnums[userInfo.role]}</div>
                </Dropdown.Item>
                <Dropdown.Item>
                <div onClick={() => router.push(`/profile/edit/${userInfo.id}`)}>
                  Manage Account
                </div>
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
