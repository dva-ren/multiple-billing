import { ref } from 'vue'

export function useData<T>(fn: () => Promise<T>) {
  const data = ref<T>()
  const loading = ref(true)

  fn().then((res) => {
    data.value = res
    loading.value = false
  }).catch((e) => {
    console.error(e)
    loading.value = false
  })
  return { data, loading }
}
