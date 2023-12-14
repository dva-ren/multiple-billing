import http from '../http'
import type { IResponseResult, IUser } from '@/types'

/**
 * 用户登录
 * @param data 登录表单
 * @returns 用户信息以及token
 */
function login(data: Record<string, any>): IResponseResult<{ access_token: string }> {
  return http.post('/user/login', data)
}

/**
 * 获取用户信息
 * @param 用户id（可选）
 */
function getUserInfo(id?: string): IResponseResult<IUser> {
  return http.get('/user', {
    params: {
      id,
    },
  })
}

/**
 * 更新用户信息
 * @param data 新的信息
 */
function updateUserInfo(data: { nickName?: string; avatar?: string }): IResponseResult {
  return http.put('/user', data)
}

/**
 * 上传头像
 * @param data 新的信息
 */
function uploadAvatar(data: FormData): IResponseResult<string> {
  return http.post('/upload', data)
}

export default {
  login,
  getUserInfo,
  updateUserInfo,
  uploadAvatar,
}
