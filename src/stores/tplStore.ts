export const tplStore = defineStore('tplStore', () => {
  const { walletAddress } = $(web3AuthStore())

  let someState = $ref('abc')

  const doSomeMethod = async() => {
    console.log('====> do something :')
    someState = 'efg'
  }
  watchEffect(async() => {
    if (!walletAddress) return
    // do some init stuff
  })

  return $$({
    someState,
    doSomeMethod,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(tplStore, import.meta.hot))
