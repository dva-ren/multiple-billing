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
function getRecordList(query?: { id?: string; checked?: boolean; ids?: string[] }): IResponseResult<IRecord[]> {
  return http.get('/getRecord', {
    params: query,
  })
}

/**
 * 获取金额
 * @returns List
 */
function getTotalMoney(): IResponseResult<{ expend: ICheckout[]; income: ICheckout[] }> {
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
