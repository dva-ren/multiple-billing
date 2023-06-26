<script lang="ts" setup>
import CategoryIcon from './CategoryIcon.vue'
import type { IRecord } from '@/types'
import categores from '@/data/category.json'
import { formatToDate } from '@/utils/date'

const props = defineProps<{
  data: IRecord
}>()
</script>

<template>
  <view
    bg-white
    p-4
    my-2
    flex
    gap-4
    items-center
    justify-between
    rounded-xl
    class="bill-item"
  >
    <CategoryIcon :category="props.data.record.category" />
    <view flex-1>
      <view font-bold mb-1>
        {{ props.data.record.remark ?? categores[data.record.category].name }}
      </view>
      <view text="~ xs gray-400">
        {{ formatToDate(props.data.record.date) }}
      </view>
    </view>
    <view flex-1 flex items-center justify-center>
      <view v-for="u in props.data.record.participant" :key="u._id">
        <image
          border="~ 2px white"
          w-50
          h-50
          ml--2
          shadow
          rounded-full
          :src="u.avatar"
          mode="aspectFit"
        />
      </view>
    </view>
    <view h-full w-100 text-right>
      <span text="xs red-300" font-bold px-1>¥{{ props.data.record.amount }}</span>
    </view>
  </view>
</template>

<style scoped>
.bill-item{
  box-shadow:
  1.4px 2.4px 2.2px -6px rgba(0, 0, 0, 0.019),
  3.8px 6.6px 6px -6px rgba(0, 0, 0, 0.023),
  9px 16px 14.5px -6px rgba(0, 0, 0, 0.028),
  30px 53px 48px -6px rgba(0, 0, 0, 0.04);
}
</style>
