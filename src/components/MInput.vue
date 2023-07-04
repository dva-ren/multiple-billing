<script lang="ts" setup>
const props = defineProps<{
  value: string
}>()
function handleInout(e: Event) {
  const input = e.target as HTMLInputElement
  console.log('input.value', input.value)
}
</script>

<template>
  <view>
    <view contenteditable @input="handleInout">
      {{ props.value }}
    </view>
  </view>
</template>
