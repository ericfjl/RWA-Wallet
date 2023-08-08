import { createFromPrivateKey, createClient, Collection, syncAccountNonce, getCollection, addDoc, queryDoc } from 'db3.js'

export const addDb3Item = async (account, collectionName, data ) => {
   const client = createClient(
    'https://scroll.rollup.testnet.db3.network',
    'https://scroll.index.testnet.db3.network',
    createFromPrivateKey(account.privateKey)
  )
  await syncAccountNonce(client)
  const dbAddress = '0x2345e27b939e110de48faca7e72ad2a65415614b'
  const collection = await getCollection(dbAddress, collectionName, client)
  return addDoc(collection, data)
}