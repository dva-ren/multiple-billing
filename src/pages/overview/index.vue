<script lang="ts" setup>
import { ref } from 'vue'
import { recordApi } from '@/api'
import { useData } from '@/hooks'

const list = ref([])

// async function getList() {
//   const res = await
//   list.value = res.data
// }
const { data, loading } = useData(() => recordApi.getTotalMoney())
async function checkout(ids: string[]) {
  uni.showLoading({
    title: '结算中',
  })
  try {
    const res = await recordApi.checkout(ids)
    if (res.code === 200) {
      uni.showToast({
        icon: 'success',
        title: res.msg,
      })
    }
    else {
      uni.showToast({
        icon: 'error',
        title: res.msg,
      })
    }
  }
  catch (error) {
    console.error(error)
    uni.showToast({
      icon: 'error',
      title: '服务器错误',
    })
  }
}
async function handleCheckout(ids: string[]) {
  uni.showModal({
    showCancel: true,
    title: '确定结算？',
    success: ({ confirm }) => {
      if (confirm)
        checkout(ids)
    },
  })
}
</script>

<template>
  <view v-if="loading" flex-center h-full>
    <u-loading mode="circle" />
  </view>
  <view v-if="!loading" class="bg-color" h-full p-4>
    <view
      v-for="i in data?.data"
      :key="i._id"
      p-4
      mt-4
      bg-white
      w-full
      rounded-xl
      class="line-1"
    >
      <view flex justify-between>
        <view>
          <u-avatar :src="i.payTo.avatar" />
          <view>{{ i.payTo.nickName }}</view>
        </view>
        <navigator
          url="/pages/bill/index"
          open-type="navigate"
          hover-class="navigator-hover"
          items-center
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
          ¥ {{ i.totalAmount }}
        </view>
        <div class="button" text-base p-2 w-200 shadow bg="#fbc2eb" text-center rounded-full @click="handleCheckout(i.ids)">
          结算
        </div>
      </view>
    </view>
    <view v-if="!data?.data.length" text-center p-10>
      已结清
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
