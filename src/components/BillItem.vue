<script lang="ts" setup>
import { computed } from 'vue'
import CategoryIcon from './CategoryIcon.vue'
import type { IRecord } from '@/types'
import categores from '@/data/category.json'
import { formatToDate } from '@/utils/date'

const props = defineProps<{
  data: IRecord
  showAmount?: boolean
}>()

const participant = computed(() => {
  return props.data.record.participant.filter((item) => {
    return item._id !== props.data.record.creatorId
  })
})
</script>

<template>
  <view
    bg-white
    p-3
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
        {{ props.data.record.remark || categores[data.record.category].name }}
      </view>
      <view text="~ xs gray-400">
        {{ formatToDate(props.data.record.date) }}
      </view>
    </view>
    <view flex-1 flex items-center justify-center>
      <view>
        <image
          border="~ 2px blue"
          w-60
          h-60
          ml--2
          shadow
          rounded-full
          :src="props.data.record.creator.avatar"
          mode="aspectFit"
        />
      </view>
      <view v-for="u in participant" :key="u._id">
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
    <view h-full w-100 text-right flex="~ col" flex-1>
      <view v-if="props.showAmount" text="xs #8a988e" font-bold px-1 lh-6>
        ¥{{ props.data.sharedAmount }}
      </view>
      <view text="xs" font-bold px-1>
        <span v-if="props.showAmount" text-gray-400>总</span>
        <span text="#eba0b3">
          ¥{{ props.data.record.amount }}
        </span>
      </view>
    </view>
  </view>
</template>

<style scoped>
.bill-item{
  box-shadow:
  0px 2.4px 2.2px -6px rgba(0, 0, 0, 0.019),
  0px 6.6px 6px -6px rgba(0, 0, 0, 0.023),
  0px 16px 14.5px -6px rgba(0, 0, 0, 0.028),
  0px 53px 48px -6px rgba(0, 0, 0, 0.04);
}
</style>
