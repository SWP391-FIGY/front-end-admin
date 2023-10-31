import { AUTH_TOKEN } from './constants'

export const getToken = () => {
  if (typeof window == 'undefined') return
  return localStorage.getItem(AUTH_TOKEN)
}

export const setToken = token => {
  if (typeof window == 'undefined') return
  if (token) {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export const removeToken = () => {
  if (typeof window == 'undefined') return
  localStorage.removeItem(AUTH_TOKEN)
}
