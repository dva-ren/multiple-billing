<script lang="ts" setup>
import { computed } from 'vue'
import CategoryIcon from './CategoryIcon.vue'
import type { Bill } from '@/types'
import categores from '@/data/category.json'
import { formatToDate } from '@/utils/date'

const props = defineProps<{
  data: Bill
  showAmount?: boolean
}>()
const participant = computed(() => {
  return props.data.participant.filter((item) => {
    return item.userId !== props.data.creatorId
  })
})
</script>

<template>
  <view
    p-3
    my-2
    flex
    gap-4
    items-center
    justify-between
    rounded-xl
    class="bill-item"
    bg-white
    :class="{ income: props.data.type === 'INCOME' }"
  >
    <CategoryIcon :category="props.data.category" />
    <view flex-1>
      <view font-bold mb-1>
        {{ props.data.remark || categores[data.category].name }}
      </view>
      <view text="~ xs gray-400">
        {{ formatToDate(props.data.date) }}
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
          :src="props.data.creator.avatar"
          mode="aspectFit"
        />
      </view>
      <view v-for="u in participant" :key="u.id">
        <image
          border="~ 2px white"
          w-50
          h-50
          ml--2
          shadow
          rounded-full
          :src="u.user.avatar"
          mode="aspectFit"
        />
      </view>
    </view>
    <view h-full w-100 text-right flex="~ col" flex-1>
      <view text="xs #eba0b3" font-bold px-1 lh-6>
        ¥{{ props.data.participant[0].splitMoney }}
      </view>
      <view v-if="props.showAmount" text="xs" font-bold px-1>
        <span text="#8a988e">
          共：{{ props.data.money }}
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
.income{
  position: relative;
}
.income::after{
  content: '';
  position: absolute;
  width: 6px;
  height: 14px;
  background-color: #eba0b3;
  left: 3px;
  border-radius: 4px;
}
</style>
