export const txStore = defineStore('txStore', () => {
  let isShow = $ref(true)

  const toggle = async() => {
    isShow = !isShow
  }
  watchEffect(async() => {
    // do some init stuff
  })

  return $$({
    isShow,
    toggle,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(txStore, import.meta.hot))
