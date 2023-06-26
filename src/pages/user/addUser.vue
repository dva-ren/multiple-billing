<script lang="ts" setup>
import { ref } from 'vue'
import { userApi } from '@/api'
import { useMainStore } from '@/store'

const uid = ref('')
async function handleAdd() {
  if (uid.value.trim().length < 6) {
    uni.showToast({
      icon: 'error',
      title: '输入少于6位',
    })
    return
  }
  const res = await userApi.addFriends(uid.value)
  if (res.code === 200) {
    useMainStore().INIT_STORE()
    uni.showToast({
      icon: 'success',
      title: '添加成功',
    })
  }
  else {
    console.error(res)
    uni.showToast({
      icon: 'error',
      title: res.msg,
    })
  }
}
</script>

<template>
  <view class="main">
    <u-form>
      <u-form-item>
        <u-input v-model="uid" type="text" placeholder="用户id" />
      </u-form-item>
      <u-button @click="handleAdd">
        添加用户
      </u-button>
    </u-form>
  </view>
</template>
