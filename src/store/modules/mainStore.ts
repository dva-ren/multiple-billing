import { defineStore } from 'pinia'
import type { Activity, Bill, IUser } from '@/types'
import { activitiesApi, billApi, userApi } from '@/api'

const useStore = defineStore('main', {
  state: () => ({
    isLogin: false,
    userInfo: {
      id: '',
      nickname: '',
      avatar: '',
    } as IUser,
    bills: [] as Bill[],
    billIds: [] as string[],
    activeties: [] as Array<Activity>,
    activetityId: '',
  }),
  actions: {
    CLEAR_STATE() {
      this.isLogin = false
      this.userInfo.id = ''
      this.userInfo.nickname = ''
      this.userInfo.avatar = ''
      this.bills = []
      this.billIds = []
      this.activeties = []
      this.activetityId = ''
    },
    INIT_STORE() {
      return new Promise((resolve, reject) => {
        const access_token = uni.getStorageSync('access_token')
        if (access_token) {
          const p1 = userApi.getUserInfo().then((res) => {
            if (res.code === 200) {
              this.SET_USER_INFO(res.data)
            }
            else if (res.code === 400) {
              uni.showToast({
                icon: 'error',
                title: '登录失效，请重新登录',
              })
              this.CLEAR_STATE()
            }
          })
          const p2 = activitiesApi.getAllActivities().then((res) => {
            if (res.code === 200) {
              if (res.data.length === 0)
                return
              billApi.getBillList(res.data[0].id).then((r) => {
                this.bills = r.data
              })
              this.activeties = res.data
              this.activetityId = res.data[0].id
            }
          })
          Promise.all([p1, p2]).then(resolve).catch(reject)
        }
        else {
          reject(new Error('未知错误'))
          this.CLEAR_STATE()
        }
      })
    },
    SET_USER_INFO(data: IUser) {
      this.isLogin = true
      this.userInfo = data
    },
    SET_Bills(bills: Bill[]) {
      this.bills = bills
    },
    // SET_USERS(users: IUser[]) {
    //   this.users = users
    // },
  },
})

export default useStore
