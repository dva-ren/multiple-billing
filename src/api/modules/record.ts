import http from '../http'
import type { IBillForm, IResponseResult } from '@/types'

function addRecord(data: IBillForm): IResponseResult {
  return http.post('/addRecord', data)
}
/**
 * 查询记录
 * @param id 记录id
 * @returns List
 */
function getRecordList(id?: string): IResponseResult {
  return http.get('/getRecord', {
    params: {
      id,
    },
  })
}

export default {
  addRecord,
  getRecordList,
}
