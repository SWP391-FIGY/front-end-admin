'use client';

import React from 'react';

import PageSidebar from '@/components/Sidebar/sideBar';

const PageLayout = ({ children }) => {
  return (
    <div className="flex flex-row w-full mx-auto ">
      <div className="">
        <PageSidebar />
      </div>
      <main className="flex flex-col items-center justify-between w-full min-h-screen p-24 bg-gray-200 lg:w-4/5 fade-in ">{children}</main>
    </div>
  );
};

export default PageLayout;
