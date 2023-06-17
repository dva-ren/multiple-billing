import { defineStore } from 'pinia'
import type { IUser } from '@/types'

const useStore = defineStore('main', {
  // arrow function recommended for full type inference
  state: () => ({
    // all these properties will have their type inferred automatically
    userInfo: {
      id: '1111',
      name: 'Rakib',
      avatar: 'https://avatars.githubusercontent.com/u/41265413?s=64&v=4',
      createAt: '2023-6-17',
      amount: 365.66
    } as IUser,
    record: [
      {
        id: 'aaaaa',
        category: 'other',
        name: '缴费',
        amount: 100,
        actor: [
          {
            id: '11111',
            name: '阿三',
            avatar: 'https://avatars.githubusercontent.com/u/26707388?s=64&v=4',
            createAt: '2023-6-17'
          },
          {
            id: '2222',
            name: 'Innei',
            avatar: 'https://avatars.githubusercontent.com/u/41265413?s=64&v=4',
            createAt: '2023-6-16'
          },
          {
            id: '333',
            name: 'Bot',
            avatar: 'https://avatars.githubusercontent.com/in/2740?s=64&v=4',
            createAt: '2023-6-16'
          }
        ],
        createAt: '2023-6-17'
      },
      {
        id: 'bbbb',
        category: 'food',
        name: '吃饭',
        amount: 30,
        actor: [
          {
            id: '2222',
            name: 'Innei',
            avatar: 'https://avatars.githubusercontent.com/u/41265413?s=64&v=4',
            createAt: '2023-6-16'
          },
          {
            id: '333',
            name: 'Bot',
            avatar: 'https://avatars.githubusercontent.com/in/2740?s=64&v=4',
            createAt: '2023-6-16'
          }
        ],
        createAt: '2023-6-17'
      }
    ]
  }),
  getters: {
    isLogin: (state) => state.id !== ''
  },
  actions: {}
})

export default useStore
