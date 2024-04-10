<script lang="ts" setup>
import { onLaunch, onPullDownRefresh, onShow } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import { billApi } from '@/api'
import { useCheckout, useData } from '@/hooks'
import Card from '@/components/Card.vue'
import { useMainStore } from '@/store'
import type { IBillInfo } from '@/types'

const activity = computed(() => useMainStore().activeties[0])

const { data, loading, refresh } = useData(() => billApi.getTotalMoney(activity.value.id))

async function handleCheckout(info: IBillInfo) {
  uni.showModal({
    showCancel: true,
    title: '确定结算？',
    success: async ({ confirm }) => {
      if (confirm) {
        const ids: string[] = []
        info.bills.forEach((bill) => {
          bill.participant.forEach((p) => {
            if (info.user.id === p.userId)
              ids.push(p.id)
          })
        })
        useCheckout(ids).then(refresh)
      }
    },
  })
}
onPullDownRefresh(async () => {
  await refresh()
  uni.stopPullDownRefresh()
})
onLaunch(refresh)
const isFirst = ref(true)
onShow(() => {
  if (!isFirst.value) {
    refresh()
    return
  }
  isFirst.value = false
})
</script>

<template>
  <view v-if="loading" flex-center h-full>
    <u-loading mode="flower" />
  </view>
  <view v-if="!loading" class="bg-color" h-full p-4>
    <view class="pre-border font-bold">
      支出
    </view>
    <view>
      <Card v-for="i, idx in data?.data.expend" :key="idx" :data="i" :show-button="false" />
    </view>
    <view v-if="!data?.data.expend.length" text-center p-10>
      已结清
    </view>
    <view class="pre-border font-bold">
      收入
    </view>
    <view>
      <Card v-for="i, idx in data?.data.income" :key="idx" :data="i" @on-button-click="handleCheckout(i)" />
    </view>
    <view v-if="!data?.data.income.length" text-center p-10>
      已结清
    </view>
  </view>
</template>
