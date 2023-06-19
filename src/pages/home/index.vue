<script lang="ts" setup>
import BillItem from '@/components/BillItem.vue'
import useStore from '@/store/modules/countStore'
import users from '@/data/users.json'

const { userInfo } = useStore()
const { record } = useStore()

const handleAvatarClick = () => {
  uni.navigateTo({
    url: '/pages/user/index'
  })
}
</script>

<template>
  <view class="main">
    <view flex justify-between items-center>
      <view>
        <view text-gray-600>Hi {{ userInfo.name }}</view>
        <view text="~ 2xl" font-bold>Split your bill</view>
      </view>
      <view>
        <u-avatar :src="userInfo.avatar" @click="handleAvatarClick"></u-avatar>
      </view>
    </view>
    <view bg-black w-full mt-4 p6 text-white rounded-xl>
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
              <image
                v-for="u in users"
                :key="u.id"
                h-80
                w-80
                bg-gray-100
                rounded-full
                :src="u.avatar"
              ></image>
            </view>
          </view>
          <view mt-6>
            <view class="add-btn" rounded>
              <navigator url="/pages/add/index" open-type="navigate">添加账单</navigator>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view mt-6>
      <view text-xl font-bold mb-4>Recent Split</view>
      <bill-item v-for="i in record" :key="i.id" :data="i" />
    </view>
  </view>
</template>

<style scoped>
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
