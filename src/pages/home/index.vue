<script lang="ts" setup>
import { computed } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import BillItem from '@/components/BillItem.vue'
import useStore from '@/store/modules/mainStore'

const mainStore = useStore()
const userInfo = computed(() => mainStore.userInfo)
const record = computed(() => mainStore.record)
const isLogin = computed(() => mainStore.isLogin)

function handleAvatarClick() {
  uni.navigateTo({
    url: '/pages/user/index',
  })
}
onPullDownRefresh(async () => {
  await mainStore.INIT_STORE()
  uni.stopPullDownRefresh()
})
</script>

<template>
  <view class="main">
    <view flex justify-between items-center>
      <view>
        <view v-if="isLogin" text-gray-600>
          Hi {{ userInfo.nickName }}
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
      <view>
        <view>总金额</view>
        <view>
          <view flex items-center text-2xl>
            <span text-blue mr-1>¥</span>
            <view>{{ userInfo.amount }}</view>
          </view>
          <view mt-4>
            <view text-base>
              Split With
            </view>
            <scroll-view scroll-x>
              <view flex gap-1 p-1>
                <image
                  v-for="u in userInfo.users"
                  :key="u._id"
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
                  border="2px dotted black "
                >
                  <image
                    w-60
                    h-60
                    op-80
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTE5IDEyLjk5OGgtNnY2aC0ydi02SDV2LTJoNnYtNmgydjZoNnoiLz48L3N2Zz4="
                  />
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
    </view>
    <view mt-6>
      <view text-xl font-bold mb-4>
        Recent Split
      </view>
      <view v-if="record.length">
        <BillItem v-for="i in record" :key="i._id" :data="i" />
      </view>
      <u-empty v-else text="暂无数据" mode="list" />
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
  /* background: linear-gradient(to bottom, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%); */
 /* background-blend-mode: multiply; */
  background-image: linear-gradient(45deg, #8baaaa 0%, #ae8b9c 100%);
}
</style>
