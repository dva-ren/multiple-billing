<script lang="ts" setup>
const props = defineProps<{ text?: string }>()
</script>

<template>
  <view flex items-center flex-col w-full>
    <image
      w-160
      h-160
      src="../static/empty.svg"
    />
    <view text-xs>
      {{ props.text }}
    </view>
  </view>
</template>
