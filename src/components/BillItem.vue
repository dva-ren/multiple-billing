<script lang="ts" setup>
import type { IBillItem } from '@/types'
import CategoryIcon from './CategoryIcon.vue'

const props = defineProps<{
  data: IBillItem
}>()
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
    shadow-sm
  >
    <CategoryIcon :category="props.data.category" />
    <view flex-1>
      <view font-bold mb-1> {{ props.data.name }} </view>
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
      <span text="xs red-300" font-bold px-1>¥{{ props.data.amount }}</span>
    </view>
  </view>
</template>
