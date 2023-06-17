<script lang="ts" setup>
import { getImageUrl } from '@/utils/url'

const props = defineProps<{ color: string; imgName: string }>()
</script>

<template>
  <view
    h-84
    w-84
    p-1
    :style="{ backgroundColor: props.color }"
    rounded-2
    flex-center
  >
    <image w-36 h-36 :src="getImageUrl(props.imgName)" mode="scaleToFill" />
  </view>
</template>
