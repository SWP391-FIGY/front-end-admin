'use client'
import PageSidebar from '@/components/Sidebar/sideBar'
import React from 'react'

const PageLayout = ({ children }) => {
  return (
    <div className='flex flex-row w-full mx-auto '>
      <div className='w-[20%]'>
        <PageSidebar />
      </div>
      <main className="flex min-h-[100vh] flex-col items-center justify-between p-24 w-full lg:w-[80%] ">
        {children}
      </main>
    </div>
  )
}

export default PageLayout