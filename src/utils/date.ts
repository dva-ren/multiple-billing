import dayjs from 'dayjs'

export function formatDate(date: string | number | Date, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format)
}

export function formatToDate(date: string | number | Date) {
  return dayjs(date).format('M-DD')
}
