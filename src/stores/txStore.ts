export const txStore = defineStore('txStore', () => {
  let isShow = $ref(false)
  let params = $ref({})

  const toggle = () => {
    isShow = !isShow
  }

  const updateParams = _params => {
    params = _params
  }
  watchEffect(async() => {
    // do some init stuff
  })

  return $$({
    isShow,
    params,
    updateParams,
    toggle,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(txStore, import.meta.hot))
