export const appStore = defineStore('appStore', () => {
  const payBy = $ref('$BSTSwap')
  const payTokenList = ['$BSTSwap', '$BSTEntropy']
  const walletAddress=  '0xFd191B88C97e092222475E7163353d9e83036CD4'
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
    const appContractAddress = getContractInfo('BuidlerProtocol').address
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
      contractName: 'BuidlerProtocol',
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
    payTokenList,
    addTokenCost,
    platformCommission,
    bstBalance,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(appStore, import.meta.hot))
