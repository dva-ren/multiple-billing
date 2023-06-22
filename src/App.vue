<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { useMainStore } from '@/store'

onLaunch(() => {
  useMainStore().INIT_STORE()
})
onShow(() => {
})
onHide(() => {
})
</script>

<style lang="scss">
@import 'vk-uview-ui/index.scss';
</style>
