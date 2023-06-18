<script lang="ts" setup>
const props = defineProps<{ color: string; src: string }>()
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
    <image op-70 w-40 h-40 :src="props.src" mode="scaleToFill" />
  </view>
</template>
