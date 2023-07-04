import http from '../http'
import type { IBillForm, ICheckout, IRecord, IResponseResult } from '@/types'

function addRecord(data: IBillForm): IResponseResult {
  return http.post('/addRecord', data)
}
/**
 * 查询记录
 * @param id 记录id
 * @returns List
 */
function getRecordList(query?: { id?: string; checked?: boolean }): IResponseResult<IRecord[]> {
  return http.get('/getRecord', {
    params: query,
  })
}

/**
 * 获取账单列表
 * @returns List
 */
function getTotalMoney(): IResponseResult<ICheckout[]> {
  return http.get('/get-total-money')
}

/**
 * 结算账单
 * @returns null
 */
function checkout(ids: string[]): IResponseResult {
  return http.post('/checkout', {
    ids,
  })
}

export default {
  addRecord,
  getRecordList,
  getTotalMoney,
  checkout,
}
