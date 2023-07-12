export const nftStore = defineStore('nftStore', () => {
  let nft = $ref({tokenURI: '', token: {}})

  const getNftInfo = async (tokenId) => {
    const rz = await readContract({
        contractName: 'BuidlerProtocol',
        functionName: 'getToken'
    }, tokenId, '', '')
    nft.tokenURI = rz[0]
    nft.tokenOwner  = rz[1]
    nft.basicPrice  = rz[2]
    nft.totalSupply  = rz[3]
    nft.maxSupply  = rz[4]
    nft.items  = rz[5]
    nft.metas = rz[6]

    nft.token = await parseURIData(nft.tokenURI)
  }
  watchEffect(async() => {
    // do some init stuff
  })

  return $$({
    nft,
    getNftInfo,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(nftStore, import.meta.hot))
