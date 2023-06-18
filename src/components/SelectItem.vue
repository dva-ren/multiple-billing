<script lang="ts" setup>
import { ref } from 'vue'
import ColorIcon from './ColorIcon.vue'
import categoryIcons from '@/data/category.json'

const props = defineProps<{
  icon?: string
  subTitle?: string
  title?: string
  dorpDown?: boolean
  color?: string
  onClick?: () => void
}>()

const show = ref(false)
const close = () => {
  show.value = false
}
const open = () => {
  show.value = true
}
const handleClick = () => {
  if (props.onClick) props.onClick()
  open()
}
defineExpose({
  show
})
</script>

<template>
  <view mb-4>
    <view
      bg-white
      p-3
      flex
      shadow-xl
      rounded-xl
      items-center
      @click="handleClick"
    >
      <slot name="pre">
        <ColorIcon
          :color="props.color ?? 'rgb(179, 224, 186)'"
          :src="props.icon ?? ''"
        />
      </slot>
      <view ml-2 flex-1>
        <view text-gray-500 v-if="props.subTitle">{{ props.subTitle }}</view>
        <slot name="title">
          <view font-bold lh-6>{{ props.title }}</view>
        </slot>
      </view>
      <!-- 下拉箭头 -->
      <view v-if="props.dorpDown">
        <image
          w-40
          h-40
          src="https://api.iconify.design/ic:round-keyboard-arrow-down.svg"
          mode="scaleToFill"
        />
      </view>
    </view>
    <view>
      <u-popup v-model="show" mode="bottom" border-radius="40">
        <view h-40vh p="x6 y4">
          <view text-base>{{ props.subTitle }}</view>
          <scroll-view scroll-y>
            <view py-4 max-h-30vh>
              <slot name="selection"></slot>
            </view>
          </scroll-view>
        </view>
      </u-popup>
    </view>
  </view>
</template>
