'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from 'flowbite-react';
import { HiPlus } from 'react-icons/hi';

import { getUserInfo } from '@/helper';

import CageList from './cageList';

const CageListPage = () => {
  const router = useRouter();
  const user = getUserInfo();

  return (
    <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-auto fade-in">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-bold">Cage List</h2>
        {user && user.role !== 'Staff' && (
          <Link href={'/cage/create'}>
            <Button>
              <div className="flex flex-row justify-center gap-4">
                <div className="my-auto">
                  <HiPlus />
                </div>
                <p>Add new cage</p>
              </div>
            </Button>
          </Link>
        )}
      </div>
      <CageList />
    </div>
  );
};

export default CageListPage;
