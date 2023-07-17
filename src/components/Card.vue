<script lang="ts" setup>
import { useMainStore } from '@/store'
import type { IBillInfo } from '@/types'

const props = defineProps<{ data: IBillInfo; showButton?: boolean }>()

const emits = defineEmits(['onButtonClick', 'onClick'])

const mainStore = useMainStore()

function handleClick() {
  mainStore.billIds = props.data.bills.map(i => i.id)
}
</script>

<template>
  <view
    p-4
    my-4
    bg-white
    w-full
    rounded-xl
    class="line-1"
    @click="emits('onClick')"
  >
    <view flex justify-between>
      <view>
        <u-avatar :src="props.data.user.avatar" />
        <view>{{ props.data.user.nickname }}</view>
      </view>
      <navigator
        url="/pages/bill/index"
        open-type="navigate"
        hover-class="navigator-hover"
        items-center
        @click="handleClick"
      >
        <span>查看详情</span>
        <image
          w-35
          h-35
          style="vertical-align: bottom;"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik05LjI5IDE1Ljg4TDEzLjE3IDEyTDkuMjkgOC4xMmEuOTk2Ljk5NiAwIDEgMSAxLjQxLTEuNDFsNC41OSA0LjU5Yy4zOS4zOS4zOSAxLjAyIDAgMS40MUwxMC43IDE3LjNhLjk5Ni45OTYgMCAwIDEtMS40MSAwYy0uMzgtLjM5LS4zOS0xLjAzIDAtMS40MnoiLz48L3N2Zz4="
          mode="scaleToFill"
        />
      </navigator>
    </view>
    <view flex justify-between items-center>
      <view text-2xl>
        ¥ {{ props.data.totalAmount }}
      </view>
      <div class="button" text-base p-2 w-200 shadow bg="#fbc2eb" text-center rounded-full @click="emits('onButtonClick')">
        结算
      </div>
    </view>
  </view>
</template>

<style scoped>
.line-1{
  color: white;
  background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
}
.line-1 .button{
  color: rgba(120,120,120);
}
</style>
