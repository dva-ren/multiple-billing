<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import type { IBillForm } from '@/types'
import ColorIcon from '@/components/ColorIcon.vue'
import SelectItem from '@/components/SelectItem.vue'
import categoryes from '@/data/category.json'
import users from '@/data/users.json'

const billForm = reactive<IBillForm>({
  amount: 0,
  category: 'food',
  actor: [],
  name: ''
})

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
      :color="currentCategory.color"
      :title="currentCategory.name"
      :icon="currentCategory.icon"
      dorp-down
      ref="categoryRef"
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

    <SelectItem sub-title="参与者" dorp-down>
      <template #pre>
        <ColorIcon
          color="rgb(179,24,96)"
          src="https://api.iconify.design/fe:github-alt.svg"
        />
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
    <view w-full>
      <button
        m-4
        bg-black
        text-white
        rounded-full
        absolute
        bottom-0
        right-0
        left-0
      >
        Request Now
      </button>
    </view>
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
