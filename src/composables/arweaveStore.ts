// https://web3infra.dev/zh-cn/docs/arseeding/other/tags/#content-type
const arseedUrl = 'https://arseed.web3infra.dev'
import { EthereumSigner, genNodeAPI, getTokenTagByEver, getItemMeta, getBundleFee } from "arseeding-js";
import * as bufferEs6 from 'rollup-plugin-node-polyfills/polyfills/buffer-es6'
const { Buffer } = bufferEs6

export const storeJsonToArweave = async (account, data, tagsMap,) => {
  data = Buffer.from(JSON.stringify(data))
  tagsMap['Content-Type'] = 'application/json'
  const tags = map(tagsMap, (value, name) => {
    return {name, value}
  })
  const instance = await genNodeAPI(account.privateKeyRaw);
  const options = { tags }
  const tokenTags = await getTokenTagByEver("bnb");
  try {
    const rz = await instance.sendAndPay(arseedUrl, data, tokenTags[0], options);
    const link = `https://scan.everpay.io/tx/${rz.everHash}`
    // console.log('====> storeJsonToArweave success rz :', rz)
    return {
      ...rz,
      link,
    }
  } catch (err) {
    console.error("====> err :", err);
    return {err}
  }
}

export const storeFileToArweave = async(file, tag, privateKey) => {
  // file = file.replace('ipfs://', 'https://nftstorage.link/ipfs/')
  // const fimg = await fetch(file)
  // const signer = new EthereumSigner(privateKey)
  // data = Buffer.from(await fimg.arrayBuffer())
  // const config: Config = {
  //   signer,
  //   path: '',
  //   arseedUrl,
  //   tag
  // }
  // console.log('====> data, options, config :', data, options, config)
  // // const order = await createAndSubmitItem(data, options, config)
  // // console.log(order)
  // // return order
}