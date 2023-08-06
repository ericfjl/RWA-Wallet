const arseedUrl = 'https://arseed.web3infra.dev'
import { EthereumSigner } from '~/libs/arseeding-js/'

export const storeJsonToArweave = async () => {

}

export const storeFileToArweave = async(file, tag, privateKey) => {
  file = file.replace('ipfs://', 'https://nftstorage.link/ipfs/')
  const fimg = await fetch(file)
  const signer = new EthereumSigner(privateKey)
  data = Buffer.from(await fimg.arrayBuffer())
  const config: Config = {
    signer,
    path: '',
    arseedUrl,
    tag
  }
  console.log('====> data, options, config :', data, options, config)
  // const order = await createAndSubmitItem(data, options, config)
  // console.log(order)
  // return order
}