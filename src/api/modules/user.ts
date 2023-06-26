import http from '../http'
import type { IResponseResult, IUser, IUserInfo } from '@/types'

function login(data: Record<string, any>): IResponseResult<{ access_token: string }> {
  return http.post('/login', data)
}

/**
 * 获取用户信息
 * @param
 */
function getUserInfo(): IResponseResult<IUserInfo> {
  return http.get('/get-user-info')
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
function getUserByUid(uid: string): IResponseResult<IUserInfo> {
  return http.get(`/getUsers?uid=${uid}`)
}

/**
 * 添加朋友
 * @param uid 用户ID
 */
function addFriends(uid: string): IResponseResult {
  return http.get('/add-friends', {
    params: {
      uid,
    },
  })
}

/**
 * 移除朋友
 * @param uid 用户ID
 */
function removeFriends(uid: string): IResponseResult {
  return http.get('/remove-friends', {
    params: {
      uid,
    },
  })
}

export default {
  login,
  getUserInfo,
  getUserList,
  getUserByUid,
  addFriends,
  removeFriends,
}
