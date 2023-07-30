import { createPublicClient, createWalletClient, http, toHex  } from 'viem'
import { CHAIN_CONTRACT_ABI_MAP, CHAIN_ID, CONTRACT_ADDRESS_MAP, defaultChain } from '~/constants/CHAIN'
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
  const url = CONTRACT_ADDRESS_MAP[networkKey]
  return http(url)
}

export const getPublicClient = (chain = defaultChain) => {
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
