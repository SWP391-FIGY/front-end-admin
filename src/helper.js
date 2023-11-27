import { AUTH_TOKEN, USER_INFO } from './constants';

export const getToken = () => {
  if (typeof window == 'undefined') return;
  return localStorage.getItem(AUTH_TOKEN);
};

export const setToken = (token) => {
  if (typeof window == 'undefined') return;
  if (token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
};

export const getUserInfo = () => {
  if (typeof window == 'undefined') return;
  return JSON.parse(localStorage.getItem(USER_INFO));
};

export const setUserInfo = (userInfo) => {
  if (typeof window == 'undefined') return;
  if (userInfo) {
    localStorage.setItem(USER_INFO, userInfo);
  }
};

export const removeToken = () => {
  if (typeof window == 'undefined') return;
  localStorage.removeItem(AUTH_TOKEN);
};

export const removeUserInfo = () => {
  if (typeof window == 'undefined') return;
  localStorage.removeItem(USER_INFO);
};
