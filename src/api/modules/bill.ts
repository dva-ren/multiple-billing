import http from '../http'
import type { Bill, IBillForm, IBillInfo, IResponseResult } from '@/types'

/**
 * 创建账单
 * @param data 账单表单
 * @returns null
 */
function createBill(data: IBillForm): IResponseResult {
  return http.post('/bill', data)
}

/**
 * 查询关于我的所有账单
 * @param id 记录id
 * @returns List
 */
function getBillList(activityId: string): IResponseResult<Array<Bill>> {
  return http.get('/bill', {
    params: { activityId },
  })
}

/**
 * 获取统计金额
 * @returns List
 */
function getTotalMoney<T extends 'income' | 'expend'>(activityId: string, type?: T): IResponseResult<{
  income: Array<IBillInfo>
  expend: Array<IBillInfo>
}> {
  return http.get('/bill/total', {
    params: { activityId, type },
  })
}

/**
 * 结算账单
 * @returns null
 */
function checkout(ids: string[]): IResponseResult {
  return http.post('/bill/checkout', {
    ids,
  })
}

/**
 * 批量查询账单信息
 * @param ids 账单id数组
 * @returns 账单数据
 */
function queryBills(ids: string[]): IResponseResult<Array<Bill>> {
  return http.get(`/bill/query?ids=${ids}`)
}
/**
 * 批量查询账单信息
 * @param ids 账单id数组
 * @returns 账单数据
 */
function totalMoney(activityId: string): IResponseResult<{ expend: number; income: number }> {
  return http.get(`/bill/totalMoney?activityId=${activityId}`)
}

/**
 * 查询我创建的账单
 * @param ids 账单id数组
 * @returns 账单数据
 */
function getCreatedBills(activityId: string): IResponseResult<Array<Bill>> {
  return http.get(`/bill/created?activityId=${activityId}`)
}

export default {
  createBill,
  getBillList,
  getTotalMoney,
  checkout,
  queryBills,
  totalMoney,
  getCreatedBills,
}
