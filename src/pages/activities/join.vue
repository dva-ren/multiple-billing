<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import { activitiesApi } from '@/api'
import type { Activity } from '@/types'
import { useMainStore } from '@/store'

const userInfo = useMainStore().userInfo

const activityId = ref('')
const result = ref<Activity>()
const isJoined = computed(() => {
  if (!result.value)
    return false
  return result.value?.participants.findIndex((i) => {
    return i.user.id === userInfo.id
  }) >= 0
})
onLoad((option: any) => {
  if (option.scan === '1')
    scanQrCode()
})

function scanQrCode() {
  uni.scanCode({
    success({ result }) {
      activityId.value = result
      handleSearch()
    },
  })
}

async function handleSearch() {
  if (activityId.value === '')
    return
  const res = await activitiesApi.getActivity(activityId.value)
  if (res.code === 200)
    result.value = res.data
}

async function join() {
  const res = await activitiesApi.joinActivity(activityId.value)
  if (res.code === 200) {
    uni.showToast({
      icon: 'success',
      title: res.msg,
    })
  }
  else {
    uni.showToast({
      icon: 'error',
      title: res.msg,
    })
  }
}
</script>

<template>
  <view p-4 bg="#fafafa" h-full>
    <view flex justify-between items-center gap-2>
      <input v-model="activityId" type="text" p-1 b-gray-200 bg-white flex-1>
      <button size="mini" @click="handleSearch">
        搜索
      </button>
    </view>
    <view mt-4>
      <view v-if="!result" text-center py-2>
        无结果
      </view>
      <view v-if="result" bg-white rounded p-2 flex justify-between>
        <view>
          <view>{{ result.name }}</view>
          <view mt-4>
            <u-avatar :src="result.creator.avatar" size="mini" />
            <template v-for="item in result.participants" :key="item.id">
              <u-avatar v-if="item.userId !== result.creatorId" :src="item.user?.avatar" size="60" ml--1 />
            </template>
          </view>
        </view>
        <view flex-center>
          <button v-if="!isJoined" size="mini" rounded-full @click="join">
            加入
          </button>
          <button v-if="isJoined" size="mini" disabled>
            已加入
          </button>
        </view>
      </view>
    </view>
  </view>
</template>
