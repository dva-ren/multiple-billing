<script lang="ts" setup>
import { computed } from 'vue'
import useStore from '@/store/modules/mainStore'
import { userApi } from '@/api'

const mainStore = useStore()
const userInfo = computed(() => mainStore.userInfo)
const isLogin = computed(() => mainStore.isLogin)

async function onLogin() {
  uni.showLoading({
    mask: true,
    title: '登录中',
  })
  try {
    // 获取用户信息 （头像和名称）
    const userProfile = await uni.getUserProfile({
      desc: '获取用户信息',
      lang: 'zh_CN',
    })
    if (userProfile) {
    // 调用微信登录接口获取临时code
      const loginInfo = await uni.login({ provider: 'weixin' })
      if (loginInfo) {
      // 登录临时code
        const { code } = loginInfo
        const { userInfo: { avatarUrl: avatar, nickName } } = userProfile
        // 组装后端接口需要的数据
        const params = { code, avatar, nickName }
        // 调用登录接口
        const res = await userApi.login(params)
        if (res.code === 200) {
          uni.setStorageSync('access_token', res.data.access_token)
          mainStore.INIT_STORE()
          // eslint-disable-next-line no-console
          console.log('登陆成功')
          uni.hideLoading()
        }
        else {
          uni.showToast({
            title: '登录失败',
            icon: 'error',
          })
        }
      }
    }
  }
  catch (e) {
    console.error(e)
    uni.showToast({
      title: '未知错误',
      icon: 'error',
    })
  }
}

function handleLogout() {
  uni.showModal({
    title: '提示',
    content: '确定退出登录吗?',
    success(res) {
      if (res.confirm) {
        uni.removeStorageSync('access_token')
        mainStore.CLEAR_STATE()
      }
    },
  })
}
</script>

<template>
  <view class="h-full" py-4 bg-white>
    <view text-center>
      <view v-if="isLogin">
        <u-avatar :src="userInfo.avatar" size="large" />
        <view text-base font-bold>
          {{ userInfo.nickName }}
        </view>
      </view>
      <view v-else text-center>
        <u-avatar size="large" />
        <view text-center>
          <view text-blue @click="onLogin">
            登录
          </view>
        </view>
      </view>
    </view>
    <view mt-16 p="x6 y2" text-base>
      <navigator
        url="/pages/user/update"
        open-type="navigate"
        hover-class="navigator-hover"
        class="item"
      >
        <view>
          修改资料
        </view>
      </navigator>
      <view class="item" text-gray>
        我的好友
      </view>
      <view class="item" text-gray>
        其他设置
      </view>
      <view v-if="isLogin" text="center blue-400" class="item" @click="handleLogout">
        退出登录
      </view>
    </view>
  </view>
</template>

<style scoped>
.item{
  padding: 16rpx;
  border-bottom: 1px solid rgba(50,50,50,0.1);
}
</style>
