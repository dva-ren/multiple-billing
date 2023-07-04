<script lang="ts" setup>
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { recordApi } from '@/api'
import { useData } from '@/hooks'
import Card from '@/components/Card.vue'
import { useMainStore } from '@/store'

const { data, loading, refresh } = useData(() => recordApi.getTotalMoney())
async function checkout(ids: string[]) {
  uni.showLoading({
    title: '结算中',
    mask: true,
  })
  try {
    const res = await recordApi.checkout(ids)
    if (res.code === 200) {
      uni.showToast({
        icon: 'success',
        title: res.msg,
      })
      refresh()
      useMainStore().INIT_STORE()
    }
    else {
      uni.showToast({
        icon: 'error',
        title: res.msg,
      })
    }
  }
  catch (error) {
    console.error(error)
    uni.showToast({
      icon: 'error',
      title: '服务器错误',
    })
  }
}

async function handleCheckout(ids: string[]) {
  uni.showModal({
    showCancel: true,
    title: '确定结算？',
    success: ({ confirm }) => {
      if (confirm)
        checkout(ids)
    },
  })
}
onPullDownRefresh(async () => {
  await refresh()
  uni.stopPullDownRefresh()
})
</script>

<template>
  <view v-if="loading" flex-center h-full>
    <u-loading mode="circle" />
  </view>
  <view v-if="!loading" class="bg-color" h-full p-4>
    <view class="pre-border font-bold">
      支出
    </view>
    <view>
      <Card v-for="i in data?.data.expend" :key="i._id" :data="i" @on-button-click="handleCheckout(i.ids)" />
    </view>
    <view v-if="!data?.data.expend.length" text-center p-10>
      已结清
    </view>
    <view class="pre-border font-bold">
      收入
    </view>
    <view>
      <Card v-for="i in data?.data.income" :key="i._id" :data="i" @on-button-click="handleCheckout(i.ids)" />
    </view>
    <view v-if="!data?.data.income.length" text-center p-10>
      已结清
    </view>
  </view>
</template>
