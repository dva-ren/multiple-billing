<script lang="ts" setup></script>

<template>
  <view class="main">
    <view flex justify-between items-center>
      <view>
        <view text-gray-600>Hi Rakib</view>
        <view text="~ 2xl" font-bold>Split your bill</view>
      </view>
      <view>
        <view h-80 w-80 bg-gray rounded-full></view>
      </view>
    </view>
    <view bg-black w-full mt-4 p4 text-white>
      <view>
        <view>总金额</view>
        <view>
          <view flex items-center text-2xl>
            <svg
              text-blue
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 21q-.425 0-.713-.288T11 20v-6H7q-.425 0-.713-.288T6 13q0-.425.288-.713T7 12h3.725l-4.75-7.45q-.325-.5-.037-1.025T6.825 3q.275 0 .5.125t.35.35L12 10.3l4.325-6.825q.125-.225.35-.35t.5-.125q.6 0 .888.525t-.038 1.025L13.275 12H17q.425 0 .713.288T18 13q0 .425-.288.713T17 14h-4v6q0 .425-.288.713T12 21Z"
              />
            </svg>
            <view>366.69</view>
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
            <view class="add-btn">立即添加</view>
          </view>
        </view>
      </view>
    </view>
    <view mt-4>
      <view text-xl font-bold mb-2>Recent Split</view>
      <view
        v-for="i in 4"
        :key="i"
        bg-white
        p="x2 y1"
        my-2
        flex
        gap-2
        items-center
        justify-between
        rounded
      >
        <view h-60 w-60 rounded-full bg-gray-4></view>
        <view flex-1>
          <view font-bold> Burger Date </view>
          <view text="~ xs gray-600" py-1>14 Jun,2021</view>
        </view>
        <view> 200 RMB </view>
      </view>
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
