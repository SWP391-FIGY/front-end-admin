"use client";

const { Sidebar } = require("flowbite-react");
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

const PageSidebar = () => {
  const router = useRouter()
  const currentPathName = usePathname();
  const currentBasePath = currentPathName.split("/")[1];
  const userInfo = getUserInfo()
  const handleLogout = () => {
    removeToken();
    removeUserInfo()
    router.push("/auth/login");
  };

  return (
    <Sidebar aria-label="Default sidebar example" className="h-[100vh]">
      <div className="flex flex-col overflow-auto justify-between h-full">
        <Sidebar.Items aria-label="Default Items example" className="w-full">
          <Sidebar.ItemGroup className="w-full ">
            {topSideBarData.map((item, index) => {
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
                    })}
                  </Sidebar.Collapse>
                );
              } else {
                const navBasePath = item.href.split("/")[1];
                const activeRouteDecoration =
                  currentBasePath === navBasePath ? "bg-gray-200" : "";
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
            })}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <Sidebar.Items aria-label="User info management">
          {userInfo ? (
            <>
              <Sidebar.ItemGroup>
                <Sidebar.Item>
                  <div>Role {userRoleEnums[userInfo.role]}</div>
                </Sidebar.Item>
                <Sidebar.Item>
                  <div>Hello User {userInfo && userInfo.name}</div>
                </Sidebar.Item>
                <Sidebar.Item icon={HiUserCircle}>
                  <p onClick={handleLogout}>Logout</p>
                </Sidebar.Item>
              </Sidebar.ItemGroup>
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
