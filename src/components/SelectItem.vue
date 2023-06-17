<script lang="ts" setup>
import { ref } from 'vue'
import ColorIcon from './ColorIcon.vue'
import { getImageUrl } from '@/utils/url'

const props = defineProps<{
  imgName: string
  subTitle?: string
  title?: string
  dorpDown?: boolean
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
  <view>
    <view p-3 flex shadow-xl rounded items-center @click="handleClick">
      <slot name="pre"></slot>
      <view ml-2 flex-1>
        <view text-gray-500 v-if="props.subTitle">{{ props.subTitle }}</view>
        <view font-bold lh-6>{{ props.title }}</view>
      </view>
      <view v-if="props.dorpDown">
        <image
          w-40
          h-40
          :src="getImageUrl('CarbonChevronDown.svg')"
          mode="scaleToFill"
        />
      </view>
    </view>
    <view>
      <u-popup v-model="show" mode="bottom" border-radius="6">
        <view h-40vh p-6>
          <view pb-4 text-base>Category</view>
          <view>
            <slot name="selection"></slot>
          </view>
        </view>
      </u-popup>
    </view>
  </view>
</template>

<style scoped lang=""></style>
