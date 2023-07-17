<script lang="ts" setup>
import { useMainStore } from '@/store'
import { useData } from '@/hooks'
import { billApi } from '@/api'
import BillItem from '@/components/BillItem.vue'

const mainStore = useMainStore()
const { data } = useData(() => billApi.queryBills(mainStore.billIds))
</script>

<template>
  <view class="main">
    <view v-if="data?.data">
      <BillItem v-for="i in data.data" :key="i.id" :data="i" show-amount />
    </view>
    <view v-else flex-center h-full>
      <u-loading mode="flower" />
    </view>
  </view>
</template>
