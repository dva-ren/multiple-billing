<script lang="ts" setup>
import { computed } from 'vue'
import { useMainStore } from '@/store'
import { useData } from '@/hooks'
import { recordApi } from '@/api'
import BillItem from '@/components/BillItem.vue'

const mainStore = useMainStore()
const ids = computed(() => mainStore.billIds)
const { data } = useData(() => recordApi.getRecordList({ ids: ids.value }))
</script>

<template>
  <view class="main">
    <view v-if="data?.data">
      <BillItem v-for="i in data.data" :key="i._id" :data="i" show-amount />
    </view>
    <view v-else flex-center h-full>
      <u-loading mode="flower" />
    </view>
  </view>
</template>
