import { billApi } from '@/api'
import { useMainStore } from '@/store'

export function useCheckout(ids: string[]) {
  return new Promise((resolve, reject) => {
    uni.showLoading({
      title: '结算中',
      mask: true,
    })
    try {
      billApi.checkout(ids).then((res) => {
        if (res.code === 200) {
          uni.showToast({
            icon: 'success',
            title: res.msg,
          })
          resolve(res)
          useMainStore().INIT_STORE()
        }
        else {
          uni.showToast({
            icon: 'error',
            title: res.msg,
          })
        }
      })
    }
    catch (error) {
      console.error(error)
      reject(error)
      uni.showToast({
        icon: 'error',
        title: '服务器错误',
      })
    }
  })
}
