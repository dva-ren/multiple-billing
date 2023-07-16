<script lang="ts" setup>
import { computed, reactive, ref, unref } from 'vue'
import type { IBillForm, IUser } from '@/types'
import ColorIcon from '@/components/ColorIcon.vue'
import SelectItem from '@/components/SelectItem.vue'
import CheckItem from '@/components/CheckItem.vue'
import categoryes from '@/data/category.json'
import { useMainStore } from '@/store'
import { formatDate } from '@/utils/date'
import { billApi } from '@/api'

const mainStore = useMainStore()
const userInfo = computed(() => mainStore.userInfo)
const activity = computed(() => mainStore.activeties[0])
const activityId = computed(() => mainStore.activetityId)

const billForm = reactive<IBillForm>({
  money: 0,
  category: 'vegetable',
  participants: [],
  date: formatDate(new Date(), 'YYYY-MM-DD'),
  remark: '',
  activityId: activityId.value,
})
const inputAmount = ref('')
const showPicker = ref(false)
const selectedList = ref<IUser[]>([])

const isEdit = ref(false)

const showLoadingMask = ref(false)
const currentCategory = computed(() => categoryes[billForm.category])
function isSelect(u: IUser) {
  return selectedList.value.includes(u)
}

const categoryRef = ref()
function close() {
  categoryRef.value.show = false
}
function onItemClick(category: any) {
  billForm.category = category
  setTimeout(() => {
    close()
  }, 50)
}
function handleUserSelect(user: IUser) {
  const idx = selectedList.value.findIndex(u => u.id === user.id)

  if (idx >= 0)
    selectedList.value.splice(idx, 1)
  else
    selectedList.value.push(user)
}
function handleDateChange(date: any) {
  billForm.date = date.result
}
const reg = /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/

async function handleAddBill() {
  if (!reg.test(billForm.money!.toString())) {
    uni.showToast({
      icon: 'error',
      title: '金额不正确',
    })
    return
  }
  if (!selectedList.value.length) {
    uni.showToast({
      icon: 'error',
      title: '未选择人员',
    })
    return
  }
  uni.showLoading({
    mask: true,
    title: '添加中',
  })
  showLoadingMask.value = true
  billForm.participants = selectedList.value.map(u => u.id)
  const res = await billApi.createBill(unref(billForm))
  if (res.code === 200) {
    showLoadingMask.value = false
    uni.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 2000,
      complete: () => {
        mainStore.INIT_STORE()
        setTimeout(() => {
          uni.navigateBack()
        }, 2000)
      },
    })
  }
  else {
    uni.showToast({
      title: res.msg ?? '添加失败',
      icon: 'error',
      duration: 2000,
    })
  }
}

function handleInput() {
  let value = inputAmount.value.trim()
    .replace(/^0/, '')
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
  if (!value.startsWith('¥'))
    value = `¥${value}`

  inputAmount.value = value
  billForm.money = Number(value.replace('¥', ''))
}
</script>

<template>
  <view class="main">
    <view text="~ 4xl" font-bold pb-10>
      <view relative>
        <input
          v-model="inputAmount"
          text="center 4xl"
          h-full
          w-fill
          focus
          type="digit"
          placeholder="¥0"
          @input="handleInput"
        >
      </view>
      <view relative vertical-bottom text="center sm gray-600" h-20>
        <view v-if="!isEdit">
          <image op-70 mb--2px w-28 h-28 src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTQgMjBoMTZNNCAyMHYtNGw4LThNNCAyMGg0bDgtOG0tNC00bDIuODY5LTIuODY5bC4wMDEtLjAwMWMuMzk1LS4zOTUuNTkzLS41OTMuODIxLS42NjdhMSAxIDAgMCAxIC42MTggMGMuMjI4LjA3NC40MjUuMjcyLjgyLjY2NmwxLjc0IDEuNzRjLjM5Ni4zOTYuNTk0LjU5NC42NjguODIyYTEgMSAwIDAgMSAwIC42MThjLS4wNzQuMjI4LS4yNzIuNDI2LS42NjguODIyaDBMMTYgMTIuMDAxbS00LTRsNCA0Ii8+PC9zdmc+" />
          <span underline>{{ billForm.remark === '' ? '备注' : billForm.remark }}</span>
        </view>
        <input v-model="billForm.remark" :class="isEdit ? '' : 'op-0'" absolute inset-0 inline-block type="text" placeholder="" @focus="isEdit = true" @blur="isEdit = false">
      </view>
    </view>
    <SelectItem
      ref="categoryRef"
      sub-title="分类"
      :color="currentCategory.color"
      :title="currentCategory.name"
      :icon="currentCategory.icon"
      dorp-down
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
          :style="{
            backgroundColor:
              billForm.category === i.tag ? 'rgba(179,224,186,0.5)' : '',
          }"
          @click="() => onItemClick(i.tag)"
        >
          <ColorIcon :color="i.color" :src="i.icon" />
          <view ml-4 font-bold>
            {{ i.name }}
          </view>
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
        <view v-if="selectedList.length" flex>
          <view v-for="i in selectedList" :key="i.id">
            <image
              w-48
              h-48
              ml--1
              border="~ gray-200"
              rounded-full
              :src="i.avatar"
              mode="aspectFill"
            />
          </view>
        </view>
        <view v-else text-green-700 font-bold>
          点击选择
        </view>
      </template>
      <template #selection>
        <!-- <view v-if="!userInfo.users.length" flex-center h-full>
          <view>
            <view mt-10 lh-8>
              还没有可以选择的人员
            </view>
            <navigator
              url="/pages/user/addUser"
              open-type="navigate"
              hover-class="navigator-hover"
              text="~ sm blue center"
            >
              去添加
            </navigator>
          </view>
        </view> -->
        <CheckItem
          class="text-blue"
          :avatar="userInfo.avatar"
          name="ME"
          :is-select="isSelect(userInfo)"
          @click="handleUserSelect(userInfo)"
        />
        <CheckItem
          v-for="u in activity.participant"
          :key="u.id"
          :avatar="u.avatar"
          :name="u.nickname"
          :is-select="isSelect(u)"
          @click="handleUserSelect(u)"
        />
      </template>
    </SelectItem>
    <SelectItem
      sub-title="时间选择"
      :on-click="() => showPicker = true"
      :title="billForm.date"
      icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTE5IDNoLTFWMWgtMnYySDhWMUg2djJINWMtMS4xMSAwLTIgLjg5LTIgMnYxNGEyIDIgMCAwIDAgMiAyaDE0YzEuMTEgMCAyLS44OSAyLTJWNWEyIDIgMCAwIDAtMi0ybTAgMnYySDVWNWgxNE01IDE5VjloMTR2MTBINW0zLTZoOHYySDh2LTJaIi8+PC9zdmc+"
    />
    <u-calendar v-model="showPicker" mode="date" @change="handleDateChange" />
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
  </view>
</template>

<style scoped lang="scss">
.main {
  padding: 40rpx;
  background-color: rgba(250, 250, 250);
}

.navigator-hover{
  background: transparent;
}
</style>
