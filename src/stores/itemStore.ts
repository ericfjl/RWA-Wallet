export const itemStore = defineStore('itemStore', () => {
  let item = $ref({})
  let params = $ref({})
  let opts = $ref({})

  const update = (_params, _opts = {}) => {
    params = _params
    opts = _opts
  }
  watchEffect(async() => {
    // do some init stuff
  })

  return $$({
    item,
    params,
    opts,
    update,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(itemStore, import.meta.hot))
