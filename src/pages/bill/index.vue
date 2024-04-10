<script lang="ts" setup>
import { ref } from 'vue'
import { useMainStore } from '@/store'
import { useCheckout, useData } from '@/hooks'
import { billApi } from '@/api'
import BillItem from '@/components/BillItem.vue'
import type { Bill } from '@/types'

const mainStore = useMainStore()
const checkedBills = ref<Bill[]>([])

const { data, refresh } = useData(async () => {
  if (mainStore.billIds.length === 0)
    return { data: [] }
  const res = await billApi.queryBills(mainStore.billIds)
  checkedBills.value = [...res.data]
  return res
})

async function handleCheckout() {
  uni.showModal({
    showCancel: true,
    title: '确定结算？',
    success: ({ confirm }) => {
      if (confirm) {
        const ids: string[] = []
        checkedBills.value.forEach((bill) => {
          for (let j = 0; j < bill.participant.length; j++) {
            if (bill.participant[j].userId === mainStore.billUser)
              ids.push(bill.participant[j].id)
          }
        })
        useCheckout(ids).then(() => {
          mainStore.billIds = mainStore.billIds.filter(id => !checkedBills.value.find(bill => bill.id === id))
          checkedBills.value = []
          refresh()
        })
      }
    },
  })
}

function handleClick(bill: Bill) {
  const index = checkedBills.value.indexOf(bill)
  if (index === -1)
    checkedBills.value.push(bill)
  else
    checkedBills.value.splice(index, 1)
}
</script>

<template>
  <view class="main">
    <view v-if="data?.data">
      <BillItem
        v-for="i in data.data"
        :key="i.id" :data="i"
        show-amount
        :checked="checkedBills.includes(i)"
        @click="handleClick(i)"
      />
      <view v-if="!data?.data.length" text-center p-10>
        已结清
      </view>
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
          :disabled="!checkedBills.length"
          @click="handleCheckout"
        >
          结算 {{ checkedBills.length }}/{{ mainStore.billIds.length }}
        </button>
      </view>
    </view>
    <view v-else flex-center h-full>
      <u-loading mode="flower" />
    </view>
  </view>
</template>
