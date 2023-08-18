<script lang="ts" setup>
import { computed, ref } from 'vue'
import { activitiesApi } from '@/api'
import { useData } from '@/hooks'
import type { Activity } from '@/types'
import { useMainStore } from '@/store'

const { data, loading, refresh } = useData(() => activitiesApi.getAllActivities())

const input = ref('')
const showModal = ref(false)
const userId = computed(() => useMainStore().userInfo.id)
const modal = ref()
const showQrCodeModal = ref(false)
const activityId = ref('')

async function handleCreate() {
  input.value = input.value.trim()
  if (input.value.length < 2) {
    uni.hideLoading()
    uni.showToast({
      icon: 'error',
      title: '至少为2个字符',
    })
    modal.value.clearLoading()
    return
  }
  try {
    const res = await activitiesApi.createActivity(input.value)
    uni.hideLoading()
    if (res.code === 200) {
      uni.showToast({
        icon: 'success',
        title: res.msg,
      })
      refresh()
      showModal.value = false
    }
    else {
      uni.showToast({
        icon: 'error',
        title: res.msg,
      })
      modal.value.clearLoading()
    }
  }
  catch (e) {
    uni.showToast({
      icon: 'error',
      title: '服务器错误',
    })
    showModal.value = false
  }
  finally {
    uni.hideLoading()
  }
}

function handleClick() {
  input.value = ''
  showModal.value = true
}

function handleRemove(activity: Activity) {
  uni.showModal({
    title: '确定该操作',
    content: '',
    showCancel: true,
    success: async ({ confirm, cancel }) => {
      if (confirm) {
        let res
        if (activity.creatorId === userId.value)
          res = await activitiesApi.dissolutionActivity(activity.id)
        else
          res = await activitiesApi.exitActivity(activity.id)
        uni.showToast({
          icon: 'none',
          title: res.msg,
        })
        refresh()
        return true
      }
    },
  })
}

function handleCopy(id: string) {
  uni.setClipboardData({
    data: id,
    success() {
      uni.showToast({
        icon: 'success',
        title: '已复制',
      })
    },
  })
}
function handleJoin() {
  uni.navigateTo({
    url: '/pages/activities/join',
  })
}
function showQrCode(id: string) {
  activityId.value = id
  showQrCodeModal.value = true
}
</script>

<template>
  <view h-full p-4 bg="#fafafa">
    <view v-if="showQrCodeModal" bg="gray-200 op-70" fixed z-999 inset-0 flex-center h-full w-full @click="showQrCodeModal = false">
      <image
        w-400
        h-400
        :src="`https://api.pwmqr.com/qrcode/create/?url=${activityId}`"
      />
    </view>
    <view>
      <view flex justify-between items-center>
        <view class="pre-border">
          所有活动
        </view>
        <u-button plain size="mini" text-sm shape="circle" type="primary" @click="handleJoin">
          加入活动
        </u-button>
      </view>
      <u-modal ref="modal" v-model="showModal" :show-cancel-button="true" title="创建活动" :async-close="true" @confirm="handleCreate">
        <view p-2>
          <u-input v-model="input" placeholder="活动名称" />
        </view>
      </u-modal>
      <view v-if="loading" flex-center bg-white h-200 my-2>
        <u-loading />
      </view>
      <view v-if="!loading">
        <view v-if="data?.data.length">
          <view v-for="i in data?.data" :key="i.id" my-4>
            <view bg-white p="x4 y2" my-1 rounded-xl>
              <view mb-4 flex justify-between>
                <view>{{ i.name }}</view>
                <view flex items-center gap-2>
                  <image
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTQgNWExIDEgMCAwIDEgMS0xaDRhMSAxIDAgMCAxIDEgMXY0YTEgMSAwIDAgMS0xIDFINWExIDEgMCAwIDEtMS0xem0zIDEydi4wMU0xNCA1YTEgMSAwIDAgMSAxLTFoNGExIDEgMCAwIDEgMSAxdjRhMSAxIDAgMCAxLTEgMWgtNGExIDEgMCAwIDEtMS0xek03IDd2LjAxTTQgMTVhMSAxIDAgMCAxIDEtMWg0YTEgMSAwIDAgMSAxIDF2NGExIDEgMCAwIDEtMSAxSDVhMSAxIDAgMCAxLTEtMXptMTMtOHYuMDFNMTQgMTRoM20zIDB2LjAxTTE0IDE0djNtMCAzaDNtMC0zaDNtMCAwdjMiLz48L3N2Zz4="
                    w-50
                    h-50
                    @click="showQrCode(i.id)"
                  />
                  <view text="~ xs gray-400" underline @click="handleCopy(i.id)">
                    复制id
                  </view>
                </view>
              </view>
              <view>
                <view flex justify-between items-center>
                  <view flex-center>
                    <u-avatar :src="i.creator.avatar" size="mini" />
                    <template v-for="item in i.participants" :key="item.id">
                      <u-avatar v-if="item.userId !== i.creatorId" :src="item.user.avatar" size="60" ml--1 />
                    </template>
                  </view>
                  <u-button size="mini" text-sm type="warning" @click="handleRemove(i)">
                    {{ i.creatorId === userId ? '解散活动' : '退出活动' }}
                  </u-button>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view v-else flex-center text-xs bg-white h-200 my-2>
          <view>未加入任何活动</view>
        </view>
      </view>
      <view text-center>
        <u-button size="medium" shape="circle" @click="handleClick">
          创建
        </u-button>
      </view>
    </view>
  </view>
</template>
