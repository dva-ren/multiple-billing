<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { useMainStore } from '@/store'
import { userApi } from '@/api'

const mainStore = useMainStore()
const userInfo = computed(() => mainStore.userInfo)
const form = reactive({
  nickname: userInfo.value.nickname,
  avatar: userInfo.value.avatar,
})

const inputRef = ref()

async function handleSubmit() {
  if (form.nickname.length < 2) {
    uni.showToast({
      icon: 'error',
      title: '昵称至少两个字符',
    })
    return
  }
  uni.showLoading({
    title: '处理中',
  })
  try {
    const res = await userApi.updateUserInfo(form)
    if (res.code === 200) {
      uni.showToast({
        icon: 'success',
        title: '修改成功',
      })
      mainStore.INIT_STORE()
    }
    else {
      uni.showToast({
        icon: 'error',
        title: res.msg ?? '修改失败',
      })
      console.error('error-res=>', res)
    }
  }
  finally {
    uni.hideLoading()
  }
}
async function onChooseAvatar(e: any) {
  uni.showLoading({
    title: '上传中',
    mask: true,
  })
  const res = await uni.uploadFile({
    url: 'https://api.dvaren.cn/upload',
    filePath: e.detail.avatarUrl,
    name: 'file',
    header: {
      access_token: uni.getStorageSync('access_token'),
    },
  })
  if (res.statusCode === 200) {
    form.avatar = JSON.parse(res.data).data.url
    uni.hideLoading()
  }
  else {
    uni.showToast({
      title: '头像上传失败',
      icon: 'error',
      mask: true,
    })
  }
}
</script>

<template>
  <view p-4>
    <form
      @submit="handleSubmit"
    >
      <u-form-item flex-center>
        <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
          <u-avatar :src="form.avatar" size="large" />
        </button>
      </u-form-item>
      <u-form-item label="昵称">
        <input v-model="form.nickname" type="nickname" class="weui-input" placeholder="输入新昵称">
      </u-form-item>
      <button form-type="submit">
        保存修改
      </button>
    <!-- <u-button type="submit" @click="handleSubmit">
      保存修改
    </u-button> -->
    </form>
  </view>
</template>

<style scoped>
.avatar-wrapper{
  width: fit-content;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
}
.avatar-wrapper:hover{
  background: transparent;
}
.avatar-wrapper:after{
  border: none;
}
</style>
