<script lang="ts" setup>
import { computed } from 'vue'
import type { Category } from '@/types'
import ColorIcon from '@/components/ColorIcon.vue'
import { getImageUrl } from '@/utils/url'

const categoryIcon: Record<
  Category,
  { name: string; icon: string; color: string }
> = {
  food: {
    name: '食物',
    icon: 'CarbonArrival.svg',
    color: '#f4bee9'
  },
  life: {
    name: '生活缴费',
    icon: 'CarbonArrival.svg',
    color: '#fecc66'
  },
  other: {
    name: '其他',
    icon: 'CarbonArrival.svg',
    color: '#b8cdf0'
  }
}

const props = defineProps<{ category: Category }>()
const category = computed(() => categoryIcon[props.category])
</script>

<template>
  <view>
    <view v-if="category">
      <ColorIcon :color="category.color" :imgName="category.icon"></ColorIcon>
    </view>
  </view>
</template>
