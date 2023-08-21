<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'

onLaunch(() => {
  // useMainStore().INIT_STORE()
  // TODO: 字体设置无效
  // uni.loadFontFace({
  //   source: 'https://iiu.oss-cn-chengdu.aliyuncs.com/Inter.var.woff2',
  //   global: true,
  //   family: 'Inter',
  // })
})
onShow(() => {
  // useMainStore().INIT_STORE()
})
onHide(() => {
})
</script>

<style lang="scss">
@import 'vk-uview-ui/index.scss';
</style>
