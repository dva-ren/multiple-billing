import { defineStore } from 'pinia'
import type { IRecord, IUserInfo } from '@/types'
import { recordApi, userApi } from '@/api'

const useStore = defineStore('main', {
  // arrow function recommended for full type inference
  state: () => ({
    // all these properties will have their type inferred automatically
    isLogin: false,
    userInfo: {
      _id: '',
      nickName: '',
      avatar: '',
      createAt: '',
      openid: '',
      expend: 0,
      income: 0,
      users: [],
    } as IUserInfo,
    record: [] as IRecord[],
  }),
  actions: {
    CLEAR_STATE() {
      this.isLogin = false
      this.userInfo._id = ''
      this.userInfo.nickName = ''
      this.userInfo.avatar = ''
      this.userInfo.createAt = ''
      this.userInfo.expend = 0
      this.userInfo.income = 0
      this.record = []
      this.userInfo.users = []
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
          const p2 = recordApi.getRecordList({
            checked: false,
          }).then((res) => {
            if (res.code === 200)
              this.SET_RECORD(res.data)
            else if (res.code === 400)
              this.CLEAR_STATE()
          })
          // const p3 = userApi.getUserList().then((res) => {
          //   if (res.code === 200)
          //     this.SET_USERS(res.data)
          //   else if (res.code === 400)
          //     this.CLEAR_STATE()
          // })
          Promise.all([p1, p2]).then(resolve)
        }
        else {
          reject(new Error('未知错误'))
          this.CLEAR_STATE()
        }
      })
    },
    SET_USER_INFO(data: IUserInfo) {
      this.isLogin = true
      this.userInfo = data
    },
    SET_RECORD(record: IRecord[]) {
      this.record = record
    },
    // SET_USERS(users: IUser[]) {
    //   this.users = users
    // },
  },
})

export default useStore
