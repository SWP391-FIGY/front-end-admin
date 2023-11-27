'use client';

import AdminDashboard from '@/components/Dashboard/AdminDashboard';
import StaffDashboard from '@/components/Dashboard/StaffDashboard';
import { getUserInfo } from '@/helper';

export default function Home() {
  const user = getUserInfo();

  return (
    <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
      <h2 className="text-3xl font-bold">Dashboard</h2>
      {user && user.role === 'Staff' ? (
        <>
          <StaffDashboard />
        </>
      ) : (
        <>
          <AdminDashboard />
        </>
      )}
    </div>
  );
}
