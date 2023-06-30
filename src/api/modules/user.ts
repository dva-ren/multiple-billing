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
  return http.post('/add-friends', {
    uid,
  })
}

/**
 * 移除朋友
 * @param uid 用户ID
 */
function removeFriends(uid: string): IResponseResult {
  return http.post('/remove-friends', {
    uid,
  })
}

/**
 * 更新用户信息
 * @param data 新的信息
 */
function updateUserInfo(data: { nickName?: string; avatar?: string }): IResponseResult {
  return http.post('/update-user-info', data)
}

/**
 * s上传头像
 * @param data 新的信息
 */
function uploadAvatar(data: any): IResponseResult<string> {
  return http.post('/upload-avatar', data)
}

export default {
  login,
  getUserInfo,
  getUserList,
  getUserByUid,
  addFriends,
  removeFriends,
  updateUserInfo,
  uploadAvatar,
}
