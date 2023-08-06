import { createPublicClient, createWalletClient, http, toHex, formatEther  } from 'viem'
import { CHAIN_CONTRACT_ABI_MAP, CHAIN_ID, CONTRACT_ADDRESS_MAP, defaultChain, CHAIN_RPC_URI_MAP } from '~/constants/CHAIN'
import { mnemonicToAccount } from 'viem/accounts'
export { parseEther, formatEther } from 'viem'
export {CHAIN_NAME, CHAIN_ID, CHAIN_RPC_URI_MAP } from '~/constants/CHAIN'
export const getContractInfo = (contractName, chain = CHAIN_ID) => {
  const address = CONTRACT_ADDRESS_MAP[contractName][chain]
  const abi = CHAIN_CONTRACT_ABI_MAP[contractName]
  // console.log('====> address, abi :', address, abi)
  return {
    address,
    abi,
  }
}

export const getTransport = (networkKey) => {
  const url = CHAIN_RPC_URI_MAP[networkKey]
  // console.log('====> url :', url, CHAIN_RPC_URI_MAP, networkKey)
  return http(url)
}

export const getPublicClient = (chain = defaultChain) => {
  // console.log('====> chain :', chain)
  return createPublicClient({
    chain,
    transport: getTransport(chain.network),
  })
}

export const getWalletClient = (account, chain = defaultChain) => {
  return createWalletClient({
    account,
    chain,
    transport: getTransport(chain.network),
  })
}

export const estimateContractGas = async ({ account, contractName, functionName, value = '' }, ...args) => {
  const publicClient = getPublicClient()
  const { address, abi } = getContractInfo(contractName)
  const params = {
    address,
    abi,
    functionName,
    account,
    args,
  }
  if (value)
    params.value = value

    console.log('====> params :', params)
  return publicClient.estimateContractGas(params)
}

export const simulateContract = async ({ account, contractName, functionName, value = '' }, ...args) => {
  const publicClient = getPublicClient()
  const { address, abi } = getContractInfo(contractName)
  const params = {
    address,
    abi,
    functionName,
    account,
    args,
  }
  if (value)
    params.value = value

  return publicClient.simulateContract(params)
}

export const readContract = async ({ account=null, contractName, functionName }, ...args) => {
  const publicClient = getPublicClient()
  const { address, abi } = getContractInfo(contractName)
  const params = {
    address,
    abi,
    functionName,
    account,
    args,
  }

  return publicClient.readContract(params)
}

export const writeContract = async ({ account, contractName, functionName, value = '' }, ...args) => {
  const walletClient = getWalletClient(account)
  const publicClient = getPublicClient()

  const { request, result } = await simulateContract({ account, contractName, functionName, value }, ...args)
  console.log('====> request :', request)
  const hash = await walletClient.writeContract(request)
  const tx = await publicClient.waitForTransactionReceipt(
    { hash },
  )
  if (tx.status !== 'success') {
    console.log('====> tx :', tx)
    throw new Error('tx error')
  }
  return {
    tx,
    result
  }
}

export const getAccount = mnemonicStr => {
  const account = mnemonicToAccount(mnemonicStr)
  const privateKeyRaw = account.getHdKey().privateKey
  const privateKey = toHex(privateKeyRaw)
  return {
    ...account,
    privateKey,
    privateKeyRaw,
  }
}

export const initContract = (account, contractName) => {
  return {
    simulateContract: async ({ functionName, value = null }, ...args) => {
      return simulateContract({ account, contractName, functionName, value }, ...args)
    },
    writeContract: async ({ functionName, value = null }, ...args) => {
      return writeContract({ account, contractName, functionName, value }, ...args)
    },
  }
}

export const shortAddress = address => address ? `${address.substr(0, 6)}...${address.substr(-4)}` : ''

// export const formatEther = val => formatEther(`${val}`)

// 37462 => 37.5K
export const numberFormat = (num) => {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 8, notation: 'compact', compactDisplay: 'short' }).format(num)
}

export const humanFormatEther = (num) => {
  return numberFormat(formatEther(num))
}
