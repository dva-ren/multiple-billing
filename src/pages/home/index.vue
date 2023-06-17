<script lang="ts" setup>
import BillItem from '@/components/BillItem.vue'
import useStore from '@/store/modules/countStore'

const { userInfo } = useStore()
const { record } = useStore()
</script>

<template>
  <view class="main">
    <view flex justify-between items-center>
      <view>
        <view text-gray-600>Hi {{ userInfo.name }}</view>
        <view text="~ 2xl" font-bold>Split your bill</view>
      </view>
      <view>
        <image
          h-80
          w-80
          bg-gray
          rounded-full
          border="~ gray-200"
          :src="userInfo.avatar"
        ></image>
      </view>
    </view>
    <view bg-black w-full mt-4 p4 text-white>
      <view>
        <view>总金额</view>
        <view>
          <view flex items-center text-2xl>
            <span text-blue mr-1>¥</span>
            <view>{{ userInfo.amount }}</view>
          </view>
          <view mt-4>
            <view text-base>Split With</view>
            <view flex gap-1 p-1>
              <view h-80 w-80 bg-gray rounded-full></view>
              <view h-80 w-80 bg-gray rounded-full></view>
              <view h-80 w-80 bg-gray rounded-full></view>
            </view>
          </view>
          <view mt-4>
            <navigator
              url="/pages/add/index"
              open-type="navigate"
              hover-class="navigator-hover"
            >
              <view class="add-btn"> 立即添加 </view>
            </navigator>
          </view>
        </view>
      </view>
    </view>
    <view mt-4>
      <view text-xl font-bold mb-2>Recent Split</view>
      <bill-item v-for="i in record" :key="i.id" :data="i" />
    </view>
  </view>
</template>

<style scoped>
.main {
  padding: 40rpx;
  background-color: rgba(250, 250, 250);
}
.add-btn {
  padding: 20rpx 30rpx;
  width: fit-content;
  background: linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186));
  box-shadow: 0 2px 20px rgba(66, 83, 216, 0.5);
}
.add-btn:active {
  opacity: 0.8;
}
</style>
