<script setup lang="ts">
import { createFromPrivateKey, createClient, Collection, syncAccountNonce, getCollection, addDoc, queryDoc } from 'db3.js'

const account = $(inject("account"));
interface Book {
  name: string;
  author: string;
  rate: string;
}
let collection = $ref({} as Collection)
let rz = $ref({})
onMounted(async () => {
  const client = createClient(
    'https://scroll.rollup.testnet.db3.network',
    'https://scroll.index.testnet.db3.network',
    createFromPrivateKey(account.privateKey)
  )
  await syncAccountNonce(client)
  const dbAddress = '0x2345e27b939e110de48faca7e72ad2a65415614b'
  const collectionName = 'twitter'
  collection = await getCollection(dbAddress, collectionName, client)

  rz = await queryDoc<Book>(collection, "/[author=Cixin-Liu]")

})
const doSubmit = async () => {

  // add a document
  const { id } = await addDoc(collection, {
    name: "test",
    author: "Cixin-Liu",
    rate: "4.8"
  } as Book)
  console.log(id)
}

</script>
<template>
  <div bg-white p-10>
    <BsBtnIndigo @click="doSubmit">test</BsBtnIndigo>
    <pre>
    {{ rz.docs }}
    </pre>
  </div>
</template>