<script lang="ts" setup>
import { computed } from 'vue'
import type { Category } from '@/types'
import ColorIcon from '@/components/ColorIcon.vue'
import categoryIcons from '@/data/category.json'

const props = defineProps<{ category: Category }>()
const category = computed(() => categoryIcons[props.category])
</script>

<template>
  <view>
    <view v-if="category">
      <ColorIcon :color="category.color" :src="category.icon"></ColorIcon>
    </view>
  </view>
</template>
