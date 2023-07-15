export const txStore = defineStore('txStore', () => {
  let isShow = $ref(false)
  let params = $ref({})
  let opts = $ref({})

  const toggle = () => {
    if (isShow) {
      params = {}
      opts = {}
    }
    isShow = !isShow
  }

  const update = (_params, _opts = {}) => {
    params = _params
    opts = _opts
  }
  watchEffect(async() => {
    // do some init stuff
  })

  return $$({
    isShow,
    params,
    opts,
    update,
    toggle,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(txStore, import.meta.hot))
