import { createPublicClient, createWalletClient, http,  } from 'viem'
import { polygonMumbai } from 'viem/chains'
import { CHAIN_CONTRACT_ABI_MAP, CHAIN_ID, CONTRACT_ADDRESS_MAP } from '~/constants/CHAIN'
import { mnemonicToAccount } from 'viem/accounts'
export { parseEther, formatEther } from 'viem'

const CHAIN_ID = '0x13881'
export const getContractInfo = (contractName, chain = CHAIN_ID) => {
  const address = CONTRACT_ADDRESS_MAP[contractName][chain]
  const abi = CHAIN_CONTRACT_ABI_MAP[contractName]
  // console.log('====> address, abi :', address, abi)
  return {
    address,
    abi,
  }
}

export const getPublicClient = () => {
  return createPublicClient({
    chain: polygonMumbai,
    transport: http('https://polygon-mumbai.g.alchemy.com/v2/LwtsIVO7HQgliuatrjYmnqs0gVp5uxrl'),
  })
}

export const getWalletClient = (account) => {
  return createWalletClient({
    account,
    chain: polygonMumbai,
    transport: http('https://polygon-mumbai.g.alchemy.com/v2/LwtsIVO7HQgliuatrjYmnqs0gVp5uxrl'),
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

export const readContract = async ({ account, contractName, functionName }, ...args) => {
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

  const { request } = await simulateContract({ account, contractName, functionName, value }, ...args)
  const hash = await walletClient.writeContract(request)
  const tx = await publicClient.waitForTransactionReceipt(
    { hash },
  )
  if (tx.status !== 'success') {
    console.log('====> tx :', tx)
    throw new Error('tx error')
  }
  return tx
}

export const getAccount = mnemonicStr => mnemonicToAccount(mnemonicStr)

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
