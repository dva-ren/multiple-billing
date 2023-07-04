import { ref } from 'vue'

export function useData<T>(fn: () => Promise<T>) {
  const data = ref<T>()
  const loading = ref(true)

  const refresh = () => {
    return new Promise((resolve, reject) => {
      fn().then((res) => {
        data.value = res
        loading.value = false
        resolve(res)
      }).catch((e) => {
        console.error(e)
        loading.value = false
        reject(e)
      })
    })
  }
  refresh()
  return { data, loading, refresh }
}
