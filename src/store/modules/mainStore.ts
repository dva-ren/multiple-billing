import { defineStore } from 'pinia'
import type { IBillItem, IUser } from '@/types'
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
    } as IUser,
    record: [] as IBillItem[],
    amount: 0,
    users: [] as IUser[],
  }),
  actions: {
    CLEAR_STATE() {
      this.isLogin = false
      this.userInfo._id = ''
      this.userInfo.nickName = ''
      this.userInfo.avatar = ''
      this.userInfo.createAt = ''
      this.amount = 0
      this.record = []
      this.users = []
    },
    INIT_STORE() {
      const access_token = uni.getStorageSync('access_token')
      if (access_token) {
        userApi.getUserInfo().then((res) => {
          if (res.code === 200)
            this.SET_USER_INFO(res.data)
          else if (res.code === 400)
            this.CLEAR_STATE()
        })
        recordApi.getRecordList().then((res) => {
          if (res.code === 200)
            this.SET_RECORD(res.data)
          else if (res.code === 400)
            this.CLEAR_STATE()
        })
        userApi.getUserList().then((res) => {
          if (res.code === 200)
            this.SET_USERS(res.data)
          else if (res.code === 400)
            this.CLEAR_STATE()
        })
      }
      else { this.CLEAR_STATE() }
    },
    SET_USER_INFO(data: IUser) {
      this.isLogin = true
      this.userInfo = data
    },
    SET_RECORD(record: IBillItem[]) {
      this.record = record
    },
    SET_USERS(users: IUser[]) {
      this.users = users
    },
  },
})

export default useStore
