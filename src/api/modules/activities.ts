import http from '../http'
import type { Activity, IResponseResult } from '@/types'

/**
 * 创建活动
 * @param name 活动名称
 * @returns 结果
 */
function createActivity(name: string): IResponseResult {
  return http.post('/activities', {
    name,
  })
}

/**
 * 加入活动
 * @param activityId 活动id
 * @returns 结果
 */
function joinActivity(activityId: string): IResponseResult {
  return http.post(`/activities/join/${activityId}`)
}
/**
 * 退出活动
 * @param activityId 活动id
 * @returns 结果
 */
function exitActivity(activityId: string): IResponseResult {
  return http.post(`/activities/exit/${activityId}`)
}

/**
 * 获取活动的所有成员
 * @param activityId 活动id
 * @returns null
 */
function getInActivityUsers(activityId: string): IResponseResult {
  return http.post('/activities/users', {
    activityId,
  })
}

/**
 * 解散活动
 * @param activityId 活动id
 * @returns null
 */
function dissolutionActivity(activityId: string): IResponseResult {
  return http.post(`/activities/dissolution/${activityId}`)
}

/**
 * 获取所有的活动
 * @param activityId 活动id
 * @returns null
 */
function getAllActivities(): IResponseResult<Array<Activity>> {
  return http.get('/activities')
}

/**
 * 查询活动详情
 * @param activityId 活动id
 * @returns null
 */
function getActivity(activityId: string): IResponseResult<Activity> {
  return http.get(`/activities/${activityId}`)
}

export default {
  createActivity,
  joinActivity,
  exitActivity,
  dissolutionActivity,
  getInActivityUsers,
  getAllActivities,
  getActivity,
}
