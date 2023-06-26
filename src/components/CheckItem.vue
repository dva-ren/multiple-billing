<script lang="ts" setup>
const props = defineProps<{
  avatar: string
  isSelect: boolean
  name: string
}>()
const emits = defineEmits(['click'])
</script>

<template>
  <view
    flex
    my-2
    p-2
    items-center
    rounded-xl
    transition
    :style="{
      backgroundColor: props.isSelect ? 'rgba(179,224,186,0.5)' : '',
    }"
    @click="emits('click')"
  >
    <image
      w-64
      h-64
      border="~ gray-200"
      rounded-full
      :src="props.avatar"
    />
    <view flex-1 ml-4 font-bold>
      {{ props.name }}
    </view>
    <image
      v-if="!props.isSelect"
      w-64
      h-64
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNlNWU3ZWIiIGQ9Im0xMC42IDEzLjhsLTIuMTUtMi4xNXEtLjI3NS0uMjc1LS43LS4yNzV0LS43LjI3NXEtLjI3NS4yNzUtLjI3NS43dC4yNzUuN0w5LjkgMTUuOXEuMy4zLjcuM3QuNy0uM2w1LjY1LTUuNjVxLjI3NS0uMjc1LjI3NS0uN3QtLjI3NS0uN3EtLjI3NS0uMjc1LS43LS4yNzV0LS43LjI3NUwxMC42IDEzLjhaTTEyIDIycS0yLjA3NSAwLTMuOS0uNzg4dC0zLjE3NS0yLjEzN3EtMS4zNS0xLjM1LTIuMTM3LTMuMTc1VDIgMTJxMC0yLjA3NS43ODgtMy45dDIuMTM3LTMuMTc1cTEuMzUtMS4zNSAzLjE3NS0yLjEzN1QxMiAycTIuMDc1IDAgMy45Ljc4OHQzLjE3NSAyLjEzN3ExLjM1IDEuMzUgMi4xMzggMy4xNzVUMjIgMTJxMCAyLjA3NS0uNzg4IDMuOXQtMi4xMzcgMy4xNzVxLTEuMzUgMS4zNS0zLjE3NSAyLjEzOFQxMiAyMloiLz48L3N2Zz4="
      mode="scaleToFill"
    />
    <image
      v-else
      w-64
      h-64
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM0YWRlODAiIGQ9Im0xMC42IDEzLjhsLTIuMTUtMi4xNXEtLjI3NS0uMjc1LS43LS4yNzV0LS43LjI3NXEtLjI3NS4yNzUtLjI3NS43dC4yNzUuN0w5LjkgMTUuOXEuMy4zLjcuM3QuNy0uM2w1LjY1LTUuNjVxLjI3NS0uMjc1LjI3NS0uN3QtLjI3NS0uN3EtLjI3NS0uMjc1LS43LS4yNzV0LS43LjI3NUwxMC42IDEzLjhaTTEyIDIycS0yLjA3NSAwLTMuOS0uNzg4dC0zLjE3NS0yLjEzN3EtMS4zNS0xLjM1LTIuMTM3LTMuMTc1VDIgMTJxMC0yLjA3NS43ODgtMy45dDIuMTM3LTMuMTc1cTEuMzUtMS4zNSAzLjE3NS0yLjEzN1QxMiAycTIuMDc1IDAgMy45Ljc4OHQzLjE3NSAyLjEzN3ExLjM1IDEuMzUgMi4xMzggMy4xNzVUMjIgMTJxMCAyLjA3NS0uNzg4IDMuOXQtMi4xMzcgMy4xNzVxLTEuMzUgMS4zNS0zLjE3NSAyLjEzOFQxMiAyMloiLz48L3N2Zz4="
      mode="scaleToFill"
    />
  </view>
</template>
