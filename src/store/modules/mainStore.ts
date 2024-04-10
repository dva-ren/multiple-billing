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
    billIds: [] as string[],
    activeties: [] as Array<Activity>,
    activity: undefined as Activity | undefined,
    totalMoney: {
      expend: 0,
      income: 0,
    },
    billList: [] as Bill[],
    billUser: '',
  }),
  actions: {
    CLEAR_STATE() {
      this.isLogin = false
      this.userInfo.id = ''
      this.userInfo.nickname = ''
      this.userInfo.avatar = ''
      this.billIds = []
      this.activeties = []
      this.activity = undefined
      this.totalMoney = {
        expend: 0,
        income: 0,
      }
      this.billUser = ''
    },
    INIT_STORE() {
      return new Promise((resolve, reject) => {
        const access_token = uni.getStorageSync('access_token')
        if (access_token) {
          userApi.getUserInfo().then((res) => {
            if (res.code === 200) {
              this.SET_USER_INFO(res.data)
            }
            else if (res.code === 400) {
              uni.showToast({
                icon: 'error',
                title: '登录失效',
              })
              this.CLEAR_STATE()
              uni.removeStorageSync('access_token')
              reject(new Error('登录失效'))
            }
          })
          activitiesApi.getAllActivities().then((res) => {
            if (res.code === 200) {
              if (res.data.length === 0)
                return
              billApi.totalMoney(res.data[0].id).then((res) => {
                if (res.code === 200) {
                  this.totalMoney.income = res.data.income
                  this.totalMoney.expend = res.data.expend
                }
              })
              billApi.getAllBills(res.data[0].id).then((res) => {
                this.billList = res.data
              })
              this.activeties = res.data
              this.activity = res.data[0]
            }
          })
        }
        else {
          reject(new Error('当前未登录'))
        }
      })
    },
    SET_USER_INFO(data: IUser) {
      this.isLogin = true
      this.userInfo = data
    },
    // SET_USERS(users: IUser[]) {
    //   this.users = users
    // },
  },
})

export default useStore
