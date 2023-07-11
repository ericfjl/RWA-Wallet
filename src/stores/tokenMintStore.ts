export const tokenMintStore = defineStore('tokenMintStore', () => {
  let isShow = $ref(false)
  let params = $ref({
    tokenId: ''
  })
  const tokenId = $computed(()=> params.tokenId || '')
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
    tokenId,
    update,
    toggle,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(tokenMintStore, import.meta.hot))
