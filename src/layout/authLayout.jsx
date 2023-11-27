'use client';

import { useRouter } from 'next/navigation';

import { message } from 'antd';

import { getUserInfo } from '@/helper';

const AuthLayout = ({ children, allowedRoles }) => {
  const user = getUserInfo();
  const router = useRouter();

  console.log('current role', user);
  if (user && allowedRoles.find((role) => user.role === role)) {
    return <>{children}</>;
  }

  router.push('/auth/login');
  message.error('You are not allow to do this');
};

export default AuthLayout;
