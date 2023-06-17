<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { IBillForm } from '@/types'
import ColorIcon from '@/components/ColorIcon.vue'
import SelectItem from '@/components/SelectItem.vue'
import { getImageUrl } from '@/utils/url'

const billForm = reactive<IBillForm>({
  amount: 0,
  category: 'food',
  actor: [],
  name: ''
})
function handleClick() {
  console.log('aaa')
}
const categoryRef = ref()
const close = () => {
  categoryRef.value.show = false
}
const onItemClick = (value: any) => {
  billForm.category = value
  close()
}
</script>

<template>
  <view class="main">
    <view text="~ 3xl" font-bold pb-10>
      <view relative>
        <view text-center>¥ {{ billForm.amount ? billForm.amount : 0 }}</view>
        <input
          absolute
          inset-0
          text-xl
          type="number"
          w-fill
          op-0
          v-model="billForm.amount"
        />
      </view>
    </view>
    <SelectItem
      sub-title="分类"
      title="食物"
      img-name="CarbonArrival.svg"
      dorp-down
      :on-click="handleClick"
      ref="categoryRef"
    >
      <template #pre>
        <ColorIcon color="rgb(179,224,186)" img-name="CarbonArrival.svg" />
      </template>
      <template #selection>
        <view
          v-for="i in 4"
          :key="i"
          p-2
          flex
          items-center
          active:bg-blue-200
          rounded
          transition
          @click="() => onItemClick(i)"
          :style="{
            backgroundColor:
              billForm.category === i ? 'rgba(179,224,186,0.5)' : ''
          }"
        >
          <ColorIcon
            color="rgb(179,224,186)"
            img-name="CarbonArrival.svg"
          ></ColorIcon>
          <view ml-4 font-bold>Food</view>
        </view>
      </template>
    </SelectItem>

    <SelectItem
      mt-4
      sub-title="分类"
      title="食物"
      img-name="CarbonArrival.svg"
      dorp-down
      :on-click="handleClick"
    >
      <template #pre>
        <ColorIcon color="rgb(179,24,96)" img-name="CarbonArrival.svg" />
      </template>
      <template #selection>
        <view
          v-for="i in 4"
          :key="i"
          p-2
          flex
          items-center
          active:bg-blue-200
          rounded
          transition
          @click="billForm.category = i"
          :style="{
            backgroundColor:
              billForm.category === i ? 'rgba(179,224,186,0.5)' : ''
          }"
        >
          <ColorIcon
            color="rgb(179,224,186)"
            img-name="CarbonArrival.svg"
          ></ColorIcon>
          <view ml-4 font-bold>Food</view>
        </view>
      </template>
    </SelectItem>
  </view>
</template>

<style scoped lang="scss">
.main {
  padding: 40rpx;
  background-color: rgba(250, 250, 250);
}
.popup-content {
  align-items: center;
  justify-content: center;
  padding: 15px;
  height: 50px;
  background-color: #fff;
}
</style>
