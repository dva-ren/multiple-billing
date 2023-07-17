<script lang="ts" setup>
import { computed, ref } from 'vue'
import { activitiesApi } from '@/api'
import { useData } from '@/hooks'
import type { Activity } from '@/types'
import { useMainStore } from '@/store'

const { data, loading, refresh } = useData(() => activitiesApi.getAllActivities())

const input = ref('')
const showModal = ref(false)
const mode = ref(0)
const userId = computed(() => useMainStore().userInfo.id)
const modal = ref()

async function handleCreate() {
  input.value = input.value.trim()
  if (input.value.length < 2) {
    uni.hideLoading()
    uni.showToast({
      icon: 'error',
      title: '至少为2个字符',
    })
    modal.value.clearLoading()
    return
  }
  try {
    let res
    if (mode.value)
      res = await activitiesApi.createActivity(input.value)
    else
      res = await activitiesApi.joinActivity(input.value)
    uni.hideLoading()
    if (res.code === 200) {
      uni.showToast({
        icon: 'success',
        title: res.msg,
      })
      refresh()
      showModal.value = false
    }
    else {
      uni.showToast({
        icon: 'error',
        title: res.msg,
      })
      modal.value.clearLoading()
    }
  }
  catch (e) {
    uni.showToast({
      icon: 'error',
      title: '服务器错误',
    })
    showModal.value = false
  }
  finally {
    uni.hideLoading()
  }
}

function handleClick(type: 0 | 1) {
  input.value = ''
  mode.value = type
  showModal.value = true
}

function handleRemove(activity: Activity) {
  uni.showModal({
    title: '确定该操作',
    content: '',
    showCancel: true,
    success: async ({ confirm, cancel }) => {
      if (confirm) {
        let res
        if (activity.creatorId === userId.value)
          res = await activitiesApi.dissolutionActivity(activity.id)
        else
          res = await activitiesApi.exitActivity(activity.id)
        uni.showToast({
          icon: 'none',
          title: res.msg,
        })
        refresh()
        return true
      }
    },
  })
}
</script>

<template>
  <view h-full p-4 bg="#fafafa">
    <view>
      <view flex justify-between items-center>
        <view class="pre-border">
          所有活动
        </view>
        <u-button plain size="mini" text-sm shape="circle" type="primary" @click="handleClick(0)">
          加入活动
        </u-button>
      </view>
      <u-modal ref="modal" v-model="showModal" :show-cancel-button="true" :title="mode ? '创建活动' : '加入活动'" :async-close="true" @confirm="handleCreate">
        <view p-2>
          <u-input v-model="input" :placeholder="mode ? '活动名称' : '活动id'" />
        </view>
      </u-modal>
      <view v-if="loading" flex-center bg-white h-200 my-2>
        <u-loading />
      </view>
      <view v-if="!loading">
        <view v-if="data?.data.length">
          <view v-for="i in data?.data" :key="i.id" my-4>
            <view bg-white p="x4 y2" my-1 rounded-xl>
              <view mb-2>
                <view>{{ i.name }}</view>
              </view>
              <view>
                <view flex justify-between items-center>
                  <view flex-center>
                    <u-avatar :src="i.creator.avatar" size="mini" />
                    <template v-for="item in i.participant" :key="item.id">
                      <u-avatar v-if="item.id !== i.creatorId" :src="item.avatar" size="60" ml--1 />
                    </template>
                  </view>
                  <u-button size="mini" text-sm type="warning" @click="handleRemove(i)">
                    {{ i.creatorId === userId ? '解散活动' : '退出活动' }}
                  </u-button>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view v-else flex-center text-xs bg-white h-200 my-2>
          <view>未加入任何活动</view>
        </view>
      </view>
      <view text-center>
        <u-button size="medium" shape="circle" @click="handleClick">
          创建
        </u-button>
      </view>
    </view>
  </view>
</template>
