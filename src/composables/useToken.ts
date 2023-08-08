const cacheMap = {}
export function useToken(_tokenId) {
  const tokenId = $computed(()=> unref(_tokenId))
  let isLoading = $ref(true)

  let basicPrice = $ref(parseEther('0'))
  let totalSupply = $ref(0)
  let maxSupply = $ref(0)
  let metadata = $ref({})

  const doUpdate = async (isForce = false) => {
    const key = `token-${tokenId}`
    if (cacheMap[key] && !isForce) {
      isLoading = false
      basicPrice = cacheMap[key].basicPrice
      totalSupply = cacheMap[key].totalSupply
      maxSupply = cacheMap[key].maxSupply
      metadata = cacheMap[key].metadata
      return
    }
    isLoading = true
    const rz = await readContract({
        contractName: 'RWAProtocol',
        functionName: 'getToken'
    }, tokenId, '', '')

    const tokenURI = rz[0]
    const tokenOwner  = rz[1]
    basicPrice  = rz[2]
    totalSupply  = rz[3]
    maxSupply  = rz[4]
    const items  = rz[5]
    const metas = rz[6]

    metadata = await getJson(tokenURI)
    cacheMap[key] = {
      basicPrice,
      totalSupply,
      maxSupply,
      metadata,
    }

    isLoading = false
  }
  watchEffect(async () => {
    if (tokenId === '')
      return
    await doUpdate()
  })

  return $$({
    isLoading,
    basicPrice,
    totalSupply,
    maxSupply,
    metadata,
    doUpdate,
  })
}
