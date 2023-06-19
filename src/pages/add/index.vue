<script lang="ts" setup>
import { reactive, ref, computed, compile } from 'vue'
import type { IBillForm } from '@/types'
import ColorIcon from '@/components/ColorIcon.vue'
import SelectItem from '@/components/SelectItem.vue'
import categoryes from '@/data/category.json'
import users from '@/data/users.json'

const billForm = reactive<IBillForm>({
  amount: 0,
  category: 'food',
  actor: [],
  date: new Date().toLocaleDateString().replaceAll('/', '-'),
  remark: ''
})
const showPicker = ref(false)
const slelcetedList = computed(() => {
  return users.filter((i) => billForm.actor.includes(i.id))
})
const isEdit = ref(false)
const showLoadingMask = ref(false)
const currentCategory = computed(() => categoryes[billForm.category])
const isSelect = (id: string) => {
  return billForm.actor.includes(id)
}

const categoryRef = ref()
const close = () => {
  categoryRef.value.show = false
}
const onItemClick = (category: any) => {
  billForm.category = category
  setTimeout(() => {
    close()
  }, 50)
}
const handleUserSelect = (id: string) => {
  const idx = billForm.actor.indexOf(id)

  if (idx >= 0) {
    billForm.actor.splice(idx, 1)
  } else {
    billForm.actor.push(id)
  }
}
const handleDateChange = (date: any) => {
  billForm.date = date.result
}
const handleAddBill = () => {
  console.log(billForm)
  uni.showLoading({
    mask: true,
    title: '添加中'
  })
  showLoadingMask.value = true
  setTimeout(() => {
    showLoadingMask.value = false
    uni.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 2000,
      complete: () => {
        console.log('compile')
        setTimeout(() => {
          uni.navigateBack()
        }, 2000);
      }
    })
  }, 2000);
}
</script>

<template>
  <view class="main">
    <view text="~ 4xl" font-bold pb-10>
      <view relative>
        <view text-center>¥ {{ billForm.amount ? billForm.amount : 0 }}</view>
        <input
          absolute
          inset-0
          text-xl
          w-fill
          op-0
          type="number"
          v-model="billForm.amount"
        />
      </view>
      <view relative vertical-bottom text="center sm gray-600" h-20>
        <view v-if="!isEdit">
          <image op-70 mb--2px w-28 h-28 src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTQgMjBoMTZNNCAyMHYtNGw4LThNNCAyMGg0bDgtOG0tNC00bDIuODY5LTIuODY5bC4wMDEtLjAwMWMuMzk1LS4zOTUuNTkzLS41OTMuODIxLS42NjdhMSAxIDAgMCAxIC42MTggMGMuMjI4LjA3NC40MjUuMjcyLjgyLjY2NmwxLjc0IDEuNzRjLjM5Ni4zOTYuNTk0LjU5NC42NjguODIyYTEgMSAwIDAgMSAwIC42MThjLS4wNzQuMjI4LS4yNzIuNDI2LS42NjguODIyaDBMMTYgMTIuMDAxbS00LTRsNCA0Ii8+PC9zdmc+"></image>
          <span underline>{{billForm.remark=='' ? '备注':billForm.remark}}</span>
        </view>
        <input :class="isEdit?'':'op-0'" @focus="isEdit = true" @blur="isEdit=false" absolute inset-0 inline-block type="text" placeholder="" v-model="billForm.remark">
      </view>
    </view>
    <SelectItem
      sub-title="分类"
      :color="currentCategory.color"
      :title="currentCategory.name"
      :icon="currentCategory.icon"
      dorp-down
      ref="categoryRef"
      popup
    >
      <template #selection>
        <view
          v-for="i of categoryes"
          :key="i.tag"
          p-2
          flex
          items-center
          rounded-xl
          @click="() => onItemClick(i.tag)"
          :style="{
            backgroundColor:
              billForm.category === i.tag ? 'rgba(179,224,186,0.5)' : ''
          }"
        >
          <ColorIcon :color="i.color" :src="i.icon"></ColorIcon>
          <view ml-4 font-bold>{{ i.name }}</view>
        </view>
      </template>
    </SelectItem>

    <SelectItem sub-title="参与者" popup dorp-down>
      <template #pre>
        <ColorIcon
          color="#fb9968"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTE4LjM5IDE0LjU2QzE2LjcxIDEzLjcgMTQuNTMgMTMgMTIgMTNzLTQuNzEuNy02LjM5IDEuNTZBMi45NyAyLjk3IDAgMCAwIDQgMTcuMjJWMThjMCAxLjEuOSAyIDIgMmgxMmMxLjEgMCAyLS45IDItMnYtLjc4YzAtMS4xMi0uNjEtMi4xNS0xLjYxLTIuNjZ6TTEwIDEyaDRjMS42NiAwIDMtMS4zNCAzLTNjMC0uNzMtLjI3LTEuNC0uNzEtMS45MmMuMTMtLjMzLjIxLS43LjIxLTEuMDhhMyAzIDAgMCAwLTEuODYtMi43N0MxNCAyLjQ4IDEzLjA2IDIgMTIgMnMtMiAuNDgtMi42NCAxLjIzQTMgMyAwIDAgMCA3LjUgNmMwIC4zOC4wOC43NS4yMSAxLjA4QzcuMjcgNy42IDcgOC4yNyA3IDljMCAxLjY2IDEuMzQgMyAzIDN6Ii8+PC9zdmc+"
        />
      </template>
      <template #title>
        <view v-if="slelcetedList.length" flex>
          <view v-for="i in slelcetedList">
            <image
              w-48
              h-48
              ml--1
              border="~ gray-200"
              rounded-full
              :src="i.avatar"
              mode="scaleToFill"
            />
          </view>
        </view>
        <view v-else text-green-700 font-bold>点击选择</view>
      </template>
      <template #selection>
        <view
          v-for="u in users"
          :key="u.id"
          @click="handleUserSelect(u.id)"
          p-2
          my-1
          flex
          items-center
          rounded-xl
          transition
          :style="{
            backgroundColor: isSelect(u.id) ? 'rgba(179,224,186,0.5)' : ''
          }"
        >
          <image
            w-64
            h-64
            border="~ gray-200"
            rounded-full
            p-1
            :src="u.avatar"
            mode="scaleToFill"
          />
          <view flex-1 ml-4 font-bold>{{ u.name }}</view>
          <image
            v-if="!isSelect(u.id)"
            w-64
            h-64
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNlNWU3ZWIiIGQ9Im0xMC42IDEzLjhsLTIuMTUtMi4xNXEtLjI3NS0uMjc1LS43LS4yNzV0LS43LjI3NXEtLjI3NS4yNzUtLjI3NS43dC4yNzUuN0w5LjkgMTUuOXEuMy4zLjcuM3QuNy0uM2w1LjY1LTUuNjVxLjI3NS0uMjc1LjI3NS0uN3QtLjI3NS0uN3EtLjI3NS0uMjc1LS43LS4yNzV0LS43LjI3NUwxMC42IDEzLjhaTTEyIDIycS0yLjA3NSAwLTMuOS0uNzg4dC0zLjE3NS0yLjEzN3EtMS4zNS0xLjM1LTIuMTM3LTMuMTc1VDIgMTJxMC0yLjA3NS43ODgtMy45dDIuMTM3LTMuMTc1cTEuMzUtMS4zNSAzLjE3NS0yLjEzN1QxMiAycTIuMDc1IDAgMy45Ljc4OHQzLjE3NSAyLjEzN3ExLjM1IDEuMzUgMi4xMzggMy4xNzVUMjIgMTJxMCAyLjA3NS0uNzg4IDMuOXQtMi4xMzcgMy4xNzVxLTEuMzUgMS4zNS0zLjE3NSAyLjEzOFQxMiAyMloiLz48L3N2Zz4="
            mode="scaleToFill"
          />
          <image
            v-else
            w-64
            h-64
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM0YWRlODAiIGQ9Im0xMC42IDEzLjhsLTIuMTUtMi4xNXEtLjI3NS0uMjc1LS43LS4yNzV0LS43LjI3NXEtLjI3NS4yNzUtLjI3NS43dC4yNzUuN0w5LjkgMTUuOXEuMy4zLjcuM3QuNy0uM2w1LjY1LTUuNjVxLjI3NS0uMjc1LjI3NS0uN3QtLjI3NS0uN3EtLjI3NS0uMjc1LS43LS4yNzV0LS43LjI3NUwxMC42IDEzLjhaTTEyIDIycS0yLjA3NSAwLTMuOS0uNzg4dC0zLjE3NS0yLjEzN3EtMS4zNS0xLjM1LTIuMTM3LTMuMTc1VDIgMTJxMC0yLjA3NS43ODgtMy45dDIuMTM3LTMuMTc1cTEuMzUtMS4zNSAzLjE3NS0yLjEzN1QxMiAycTIuMDc1IDAgMy45Ljc4OHQzLjE3NSAyLjEzN3ExLjM1IDEuMzUgMi4xMzggMy4xNzVUMjIgMTJxMCAyLjA3NS0uNzg4IDMuOXQtMi4xMzcgMy4xNzVxLTEuMzUgMS4zNS0zLjE3NSAyLjEzOFQxMiAyMloiLz48L3N2Zz4="
            mode="scaleToFill"
          />
        </view>
      </template>
    </SelectItem>
    <SelectItem
      sub-title="时间选择"
      :on-click="()=>showPicker = true"
      :title="billForm.date"
      icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTE5IDNoLTFWMWgtMnYySDhWMUg2djJINWMtMS4xMSAwLTIgLjg5LTIgMnYxNGEyIDIgMCAwIDAgMiAyaDE0YzEuMTEgMCAyLS44OSAyLTJWNWEyIDIgMCAwIDAtMi0ybTAgMnYySDVWNWgxNE01IDE5VjloMTR2MTBINW0zLTZoOHYySDh2LTJaIi8+PC9zdmc+"
    >
    </SelectItem>
    <u-calendar @change="handleDateChange" v-model="showPicker" mode="date"></u-calendar>
    <view w-full>
      <button
        m-4
        py-1
        bg-black
        active:bg-gray-6
        transition
        text-white
        rounded-xl
        absolute
        bottom-10
        right-0
        left-0
        @click="handleAddBill"
      >
        立即添加
      </button>
    </view>
    <!-- 等待添加完成动画 -->
    <!-- <u-mask relative :show="showLoadingMask" @click="showLoadingMask = false">
      <view class="loading">
        <u-loading mode="circle"></u-loading>
      </view>
    </u-mask> -->
  </view>
</template>

<style scoped lang="scss">
.main {
  padding: 40rpx;
  background-color: rgba(250, 250, 250);
}
// .popup-content {
//   align-items: center;
//   justify-content: center;
//   padding: 15px;
//   height: 50px;
//   background-color: #fff;
// }

</style>
