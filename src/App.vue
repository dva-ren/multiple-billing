<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { useMainStore } from '@/store'

onLaunch(() => {
  // useMainStore().INIT_STORE()
})
onShow(() => {
  useMainStore().INIT_STORE()
})
onHide(() => {
})
</script>

<style lang="scss">
@import 'vk-uview-ui/index.scss';
</style>
