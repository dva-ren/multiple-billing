<script lang="ts" setup>
import { computed } from 'vue'
import { onPullDownRefresh, onShow } from '@dcloudio/uni-app'
import BillItem from '@/components/BillItem.vue'
import useStore from '@/store/modules/mainStore'
import Empty from '@/components/Empty.vue'

const mainStore = useStore()
const userInfo = computed(() => mainStore.userInfo)
const bills = computed(() => mainStore.bills)
const isLogin = computed(() => mainStore.isLogin)
const activities = computed(() => mainStore.activeties)
function handleAvatarClick() {
  uni.navigateTo({
    url: '/pages/user/index',
  })
}
onPullDownRefresh(async () => {
  await mainStore.INIT_STORE()
  uni.stopPullDownRefresh()
})

onShow(() => {
  mainStore.INIT_STORE()
})
</script>

<template>
  <view class="main">
    <view flex justify-between items-center>
      <view>
        <view v-if="isLogin" text-gray-600>
          <span>Hi</span>
          <span ml-1 text-blue-400 font-bold>{{ userInfo.nickname }}</span>
        </view>
        <view v-else text-gray-600>
          当前未登录
        </view>
        <view text="~ 2xl" font-bold>
          Split your bill
        </view>
      </view>
      <view>
        <u-avatar :src="userInfo.avatar" size="100" @click="handleAvatarClick" />
      </view>
    </view>
    <view class="card" w-full mt-4 p6 text-white rounded-xl>
      <view v-if="!activities.length" min-h-360 flex-center>
        <navigator
          v-if="isLogin"
          url="/pages/activities/index"
          open-type="navigate"
          hover-class="navigator-hover"
          class="add-btn"
          rounded
        >
          创建/加入活动
        </navigator>
        <navigator v-else class="add-btn" rounded url="/pages/user/index" open-type="navigate">
          去登陆
        </navigator>
      </view>
      <view v-if="activities.length" z-2>
        <view flex>
          <navigator
            flex-1
            url="/pages/overview/index"
            open-type="navigate"
            hover-class="navigator-hover"
          >
            <view>支出</view>
            <view>
              <view flex items-center text="3xl">
                <span mr-1>¥</span>
                <view>{{ userInfo.expend }}</view>
              </view>
            </view>
          </navigator>
          <navigator
            flex-1
            url="/pages/overview/index"
            open-type="navigate"
            hover-class="navigator-hover"
          >
            <view>
              收入
            </view>
            <view>
              <view flex items-center text="3xl">
                <span mr-1>¥</span>
                <view>{{ userInfo.income }}</view>
              </view>
            </view>
          </navigator>
        </view>
        <view mt-4>
          <view text-base>
            Split With
          </view>
          <scroll-view scroll-x>
            <view flex gap-2 p-1>
              <image
                v-for="u in activities[0]?.participant"
                :key="u.id"
                shrink-0
                h-80
                w-80
                bg-gray-100
                rounded-full
                :src="u.avatar"
              />
              <view
                shrink-0
                h-80
                w-80
                rounded-full
                flex-center
                op-80
                border="2px white-700 "
              >
                <navigator
                  url="/pages/user/addUser"
                  open-type="navigate"
                  hover-class="navigator-hover"
                  flex-center
                >
                  <image
                    w-60
                    h-60
                    op-80
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xOSAxMi45OThoLTZ2NmgtMnYtNkg1di0yaDZ2LTZoMnY2aDZ6Ii8+PC9zdmc+"
                  />
                </navigator>
              </view>
            </view>
          </scroll-view>
        </view>
        <view mt-6>
          <navigator v-if="isLogin" class="add-btn" rounded url="/pages/add/index" open-type="navigate">
            添加账单
          </navigator>
          <navigator v-else class="add-btn" rounded url="/pages/user/index" open-type="navigate">
            去登陆
          </navigator>
        </view>
      </view>
    </view>
    <view v-if="activities.length" mt-6>
      <view text-xl font-bold mb-4>
        Recent Split
      </view>
      <view v-if="bills.length">
        <BillItem v-for="i in bills" :key="i.id" :data="i" />
      </view>
      <Empty v-else text="暂无数据" />
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
.card{
  /* background-image: linear-gradient(45deg, #8baaaa 0%, #ae8b9c 100%); */
  /* background-image: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%); */
  background-image: linear-gradient(to right, #ec77ab 0%, #7873f5 100%);

}
.navigator-hover{
  background-color: transparent;
}
</style>
