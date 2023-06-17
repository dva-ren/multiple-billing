<script lang="ts" setup>
import type { IBillItem } from '@/types'
import CategoryIcon from './CategoryIcon.vue'

const props = defineProps<{
  data: IBillItem
}>()
</script>

<template>
  <view bg-white p="x3 y2" my-2 flex gap-2 items-center justify-between rounded>
    <CategoryIcon :category="props.data.category" />
    <view flex-1>
      <view font-bold> {{ props.data.name }} </view>
      <view text="~ xs gray-400">{{ props.data.createAt }}</view>
    </view>
    <view flex-1 flex items-center justify-center>
      <view v-for="u in props.data.actor" :key="u.id">
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
      <span text="base blue-400" px-1>¥{{ props.data.amount }}</span>
    </view>
  </view>
</template>
