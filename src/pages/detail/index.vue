<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { Bill, BillParticipants } from '@/types'
import { billApi } from '@/api'
import categores from '@/data/category.json'

const bill = ref<Bill>()
onLoad((options: any) => {
  billApi.queryBills([options.id]).then((res) => {
    bill.value = res.data[0]
  })
})
function participantsToString(participants: BillParticipants[]) {
  const names = participants.map(item => item.user.nickname)
  return names.join('、')
}

function handleDelete(id: string) {
  uni.showModal({
    showCancel: true,
    title: '确定删除？',
    success: async ({ confirm }) => {
      if (confirm) {
        billApi.deleteBill(id).then((res) => {
          if (res.code === 200) {
            uni.navigateBack()
            uni.showToast({
              title: '删除成功',
              icon: 'success',
            })
          }
          else {
            uni.showToast({
              title: '无法删除',
              icon: 'error',
            })
          }
        })
      }
    },
  })
}
</script>

<template>
  <view v-if="bill" p-8>
    <view class="text-center my-2">
      <text class="text-3xl font-bold">
        ￥{{ bill.money }}
      </text>
    </view>
    <view text-sm mt-10>
      <view flex gap-8 py-1>
        <view text-zinc w-160>
          参与人员
        </view>
        <view>
          <view>{{ participantsToString(bill.participant) }}</view>
        </view>
      </view>
    </view>
    <view flex gap-8 py-1>
      <view text-zinc w-160>
        分类
      </view>
      <view>{{ categores[bill.category].name }}</view>
    </view>
    <view flex gap-8 py-1>
      <view text-zinc w-160>
        消费时间
      </view>
      <view>{{ bill.date }}</view>
    </view>
    <view flex gap-8 py-1>
      <view text-zinc w-160>
        创建时间
      </view>
      <view>{{ bill.createTime }}</view>
    </view>

    <view>
      <button text-sm py-2 mt-10 text-red @click="handleDelete(bill.id)">
        删除账单
      </button>
    </view>
  </view>
</template>
