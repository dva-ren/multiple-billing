import http from '../http'
import type { IResponseResult, IUser } from '@/types'

function login(data: Record<string, any>): IResponseResult<{ access_token: string }> {
  return http.post('/login', data)
}

/**
 * 获取用户信息
 * @param
 */
function getUserInfo(): IResponseResult<IUser> {
  return http.get('/getUserInfo')
}

/**
 * 获取所有用户
 * @param
 */
function getUserList(): IResponseResult<IUser[]> {
  return http.get('/getUsers')
}

/**
 * 获取单个用户信息
 * @param uid 用户ID
 */
function getUserByUid(uid: string): IResponseResult<IUser> {
  return http.get(`/getUsers?uid=${uid}`)
}

export default {
  login,
  getUserInfo,
  getUserList,
  getUserByUid,
}
