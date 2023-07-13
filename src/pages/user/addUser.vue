<script lang="ts" setup>
import { ref } from 'vue'
import { userApi } from '@/api'
import { useMainStore } from '@/store'
import type { IUser } from '@/types'
import Empty from '@/components/Empty.vue'

const keyword = ref('')
const userList = ref<IUser[]>([])
const mainStore = useMainStore()

function isAdded(id: string) {
  return mainStore.userInfo.users.find(u => u.id === id) || id === mainStore.userInfo.id
}

async function handleSearch() {
  if (keyword.value.trim().length < 2) {
    uni.showToast({
      icon: 'error',
      title: '输入少于2位',
    })
    return
  }
  uni.showLoading({
    title: '搜索中',
    mask: true,
  })
  try {
    const res = await userApi.searchUser(keyword.value)
    if (res.code === 200)
      userList.value = res.data
  }
  catch (e) {
    console.error(e)
  }
  finally {
    uni.hideLoading()
  }
}
async function addFriend(uid: string) {
  uni.showLoading({
    title: '添加中',
    mask: true,
  })
  const res = await userApi.addFriends(uid)
  if (res.code === 200) {
    useMainStore().INIT_STORE()
    uni.showToast({
      icon: 'success',
      title: '添加成功',
    })
  }
  else {
    console.error(res)
    uni.showToast({
      icon: 'error',
      title: res.msg,
    })
  }
}
</script>

<template>
  <view class="main">
    <u-form>
      <u-form-item>
        <u-input v-model="keyword" type="text" placeholder="id或昵称" />
        <template #right>
          <u-button size="mini" :plain="true" @click="handleSearch">
            搜索
          </u-button>
        </template>
      </u-form-item>
    </u-form>
    <view mt-10>
      <view v-if="userList.length">
        <view v-for="u in userList" :key="u.id" rounded-xl py-2 px-4 bg-white flex justify-beetwen items-center>
          <u-avatar :src="u.avatar" />
          <view flex-1 px-4>
            {{ u.nickName }}
          </view>
          <view text-xs>
            <view v-if="isAdded(u.id)">
              已添加
            </view>
            <view v-else bg-blue-400 p="x2 y1" rounded text-white @click="addFriend(u.id)">
              添加
            </view>
          </view>
        </view>
      </view>
      <Empty v-else text="结果为空" />
    </view>
  </view>
</template>
