const distributor = '0xC6E58fb4aFFB6aB8A392b7CC23CD3feF74517F6C'

export const appStore = defineStore('appStore', () => {
  const payBy = $ref('$BSTSwap')
  const payTokenList = ['$BSTSwap', '$BSTEntropy']
  const account = $(inject('account'))
  const walletAddress = $computed(() => account.address)
  
  const tokenDataMap = $ref({
    $BSTSwap: {
      address: getContractInfo('BSTSwap').address,
      balance: parseEther('0'),
      allowance: parseEther('0'),
    },
    $BSTEntropy: {
      address: getContractInfo('BSTEntropy').address,
      balance: parseEther('0'),
      allowance: parseEther('0'),
    },
  })

  let addTokenCost = $ref(parseEther('0'))
  let platformCommission = $ref('')
  
  const bstBalance = $computed(() => tokenDataMap[payBy].balance)
  const bstSwapBalance = $computed(()=> tokenDataMap['$BSTSwap'].balance)
  const bstEntropyBalance = $computed(()=> tokenDataMap['$BSTEntropy'].balance)
  const payTokenAddress = $computed(() => tokenDataMap[payBy].address)
  const currentAllowance = $computed(() => tokenDataMap[payBy].allowance)

  const queryBstBalance = async () => {
    const rz = await Promise.all([
      readContract({
        contractName: 'BSTSwap',
        functionName: 'balanceOf'
      }, walletAddress),
      readContract({
        contractName: 'BSTEntropy',
        functionName: 'balanceOf'
      }, walletAddress),
    ])
    tokenDataMap.$BSTSwap.balance = rz[0] || ''
    tokenDataMap.$BSTEntropy.balance = rz[1] || ''
  }

  const queryAllowance = async () => {
    const appContractAddress = getContractInfo('RWAProtocol').address
    const rz = await Promise.all([
      readContract({
        contractName: 'BSTSwap',
        functionName: 'allowance'
      }, walletAddress, appContractAddress),
      readContract({
        contractName: 'BSTEntropy',
        functionName: 'allowance'
      }, walletAddress, appContractAddress),
    ])
    tokenDataMap.$BSTSwap.allowance = rz[0] || ''
    tokenDataMap.$BSTEntropy.allowance = rz[1] || ''
  }

  const getAppConfig = async () => {
    const rz = await readContract({
      contractName: 'RWAProtocol',
      functionName: 'getAppConfig'
    })
    addTokenCost = rz[1]
    platformCommission = rz[3]
  }
  
   watchEffect(async () => {
    await getAppConfig()

    if (!walletAddress)
      return

    await Promise.all([getAppConfig(), queryBstBalance(), queryAllowance()])
  })


  return $$({
    payBy,
    payTokenAddress,
    tokenDataMap,
    payTokenList,
    addTokenCost,
    currentAllowance,
    platformCommission,
    bstBalance,
    distributor,
    walletAddress,
    bstEntropyBalance,
    bstSwapBalance,
    queryBstBalance,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(appStore, import.meta.hot))
