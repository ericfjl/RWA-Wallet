import { createFromPrivateKey, createClient, Collection, syncAccountNonce, getCollection, addDoc, queryDoc } from 'db3.js'

const dbAddress = '0x2345e27b939e110de48faca7e72ad2a65415614b'

export const getCollection2 = async (account, collectionName) => {
  const client = createClient(
    'https://scroll.rollup.testnet.db3.network',
    'https://scroll.index.testnet.db3.network',
    createFromPrivateKey(account.privateKey)
  )
  await syncAccountNonce(client)
  const collection = await getCollection(dbAddress, collectionName, client)
  return collection
}

export const addDb3Item = async (account, collectionName, data ) => {
   const collection = await getCollection2(account, collectionName)
  return addDoc(collection, data)
}

export const getDb3Item = async (account, collectionName, query) => {
  const collection = await getCollection2(account, collectionName)
  const resultSet = await queryDoc(
      collection,
      query,
    );
  return resultSet.docs
}

export const getDb3ItemById = async (account, collectionName, id) => {
  const query = `/[id=${id}]`
  const docs = await getDb3Item(account, collectionName, query)
  return docs[0] || {}
}

export const getDb3ItemByQuery = async (account, collectionName, query) => {
  const docs = await getDb3Item(account, collectionName, query)
  return get(docs, '[0].doc', {})
}