<script lang="ts" setup>
import { ref } from 'vue'
import ColorIcon from './ColorIcon.vue'

const props = defineProps<{
  icon?: string
  subTitle?: string
  title?: string
  dorpDown?: boolean
  color?: string
  popup?: boolean
  onClick?: () => void
}>()

const show = ref(false)
function close() {
  show.value = false
}
function open() {
  show.value = true
}
function handleClick() {
  if (props.onClick)
    props.onClick()
  if (props.popup)
    open()
}
defineExpose({
  show,
})
</script>

<template>
  <view mb-4>
    <view
      bg-white
      p-2
      flex
      shadow-xl
      rounded-xl
      @click="handleClick"
    >
      <view p-1>
        <slot name="pre">
          <ColorIcon
            :color="props.color ?? 'rgb(179, 224, 186)'"
            :src="props.icon ?? ''"
          />
        </slot>
      </view>
      <view ml-2 flex-1 flex="~ col" justify-between py-2px>
        <view v-if="props.subTitle" text="xs gray-500">
          {{
            props.subTitle
          }}
        </view>
        <slot name="title">
          <view font-bold>
            {{ props.title }}
          </view>
        </slot>
      </view>
      <!-- 下拉箭头 -->
      <view v-if="props.dorpDown">
        <image
          w-40
          h-full
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM0NTQ1NDUiIGQ9Im0xMiAxNS40bC02LTZMNy40IDhsNC42IDQuNkwxNi42IDhMMTggOS40bC02IDZaIi8+PC9zdmc+"
          mode="scaleToFill"
        />
      </view>
    </view>
    <view v-if="popup">
      <u-popup v-model="show" mode="bottom" border-radius="40">
        <view h-45vh>
          <view p="x6 y4" text-base font-bold>
            {{ props.subTitle }}
          </view>
          <scroll-view scroll-y>
            <view max-h-35vh p="x6">
              <slot name="selection" />
            </view>
          </scroll-view>
        </view>
      </u-popup>
    </view>
  </view>
</template>
