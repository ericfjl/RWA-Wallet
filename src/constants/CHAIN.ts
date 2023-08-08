import chainMap from './chainMap.json'
import contractAddressMap from './contractAddressMap.json'
import { polygonMumbai, goerli } from 'viem/chains'

const allABIJsons = import.meta.glob('./abis/*.json', {eager: true})
const allABIs = {}
for (let key in allABIJsons) {
  const val = allABIJsons[key]
  key = key.replace('./abis/', '').replace('.json', '')
  allABIs[key] = val.default
}

export const CONTRACT_ADDRESS_MAP = contractAddressMap
export const defaultChain = polygonMumbai

const chainNameMap = {
  '0x5': 'goerli',
  '0x13881': "maticmum",
  '0x7a69': 'hardhat',
  '0xc45': 'hyperspace',
  '0x61': 'bscTestnet',
  '0x507': 'moonbaseAlpha',
  '0x1389': 'mantleTestnet',
}

export const CHAIN_ID = import.meta.env.VITE_CHAIN_ID || '0x13881'
export const CHAIN_MAP = chainMap
export const CHAIN_NAME = chainNameMap[CHAIN_ID]
export const CHAIN_RPC_URI_MAP = {
  [polygonMumbai.network]:'https://polygon-mumbai.g.alchemy.com/v2/LwtsIVO7HQgliuatrjYmnqs0gVp5uxrl',
  [goerli.network]: 'https://eth-goerli.g.alchemy.com/v2/pSIWu2EeWoF3HW5gmMe5xekcw0FrNvi9'
}

const RWAProtocol = [
  ...allABIs.ERC1155,
  ...allABIs.Token,
  ...allABIs.Item,
  ...allABIs.Meta,
  ...allABIs.Buidler,
  ...allABIs.App,
  ...allABIs.Market,
  // ...allABIs.DataDAO,
]

export const CHAIN_CONTRACT_ABI_MAP = {
  ...allABIs,
  RWAProtocol,
}
