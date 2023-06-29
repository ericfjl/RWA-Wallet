<script setup lang="ts">
import { useNFTStorage } from '@rwa/web3-storage'
import DropZone from './components/DropZone.vue'
interface Props {
  title?: string
  modelValue: string
}

const {
  title,
  modelValue,
} = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])
let isLoading = $ref(false)
let error = $ref('')
const { checkExist, storeBlob } = useNFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIxMmZkRTRBOEFhY0RCZWE3RWFkRGNFMGU1NkI0NTFDQzdlNTM2QjYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NzM4MTgzMDU2MywibmFtZSI6Ik5UQiJ9.Yj9ie65LXh6t6QECtGzKViX-AeTiAHnVoYybY3qfqNk' })

const addFilesAndStartUpload = async (files) => {
  const file = files[0]
  const url = URL.createObjectURL(file)
  emit('update:modelValue', url)

  isLoading = true
  const isExist = await checkExist(file)
  if (isExist) {
    emit('update:modelValue', isExist.cid)
    isLoading = false
    return
  }

  const cid = await storeBlob(file)
  emit('update:modelValue', cid)
  isLoading = false
}

async function onInputChange(e) {
  addFilesAndStartUpload(e.target.files)
  // reset so that selecting the same file again will still cause it to fire this change
  e.target.value = null
}

const resetStatus = () => {
  emit('update:modelValue', '')
  error = ''
  isLoading = false
}
</script>

<template>
  <div v-bind="$attrs">
    <DropZone v-slot="{ dropZoneActive }" class=" h-full drop-area" @files-dropped="addFilesAndStartUpload">
      <div v-if="modelValue" class="rounded-lg h-full relative overflow-hidden">
        <div v-show="isLoading" class="bg-black flex h-full w-full opacity-80 p-10 top-0 left-0 justify-center items-center absolute">
          <div i-eos-icons-loading class="h-10 text-white w-10" />
        </div>
        <div v-show="error" class="bg-black flex h-full w-full opacity-80 p-10 top-0 left-0 text-red-500 justify-center items-center absolute">
          {{ error }}
        </div>
        <div v-show="!isLoading" i-material-symbols-cancel class="h-8 top-2 right-2 text-gray-400 w-8 absolute hover:cursor-pointer" @click="resetStatus" />
        <BsBoxImg class="rounded-lg h-full object-cover w-full" v-bind="$attrs" :src="modelValue" :alt="title" />
      </div>
      <div v-else class="border-dashed rounded-lg flex h-full  border-2 border-gray-300 px-6  justify-center relative overflow-hidden">
        <div class="flex flex-col space-y-1 text-center py-10 justify-center items-center">
          <div i-heroicons-outline-photo class="mx-auto h-6 text-gray-400 w-6 sm:(w-12 h-12) " />
          <div class="h-10 ">
            <div v-if="dropZoneActive" class="text-gray-600">
              Drop to upload
            </div>
            <div v-else>
              <div class="text-center text-sm text-gray-600">
                Drag and Drop
              </div>
              <p class="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
        <label for="file-uploader" class="bg-black flex font-medium h-full bg-opacity-75 text-sm text-white w-full opacity-0 inset-0 absolute items-center justify-center hover:opacity-100 focus-within:opacity-100">
          <span>Click to upload</span>
          <span class="sr-only">image</span>
          <input id="file-uploader" type="file" name="user-photo" class="rounded-lg cursor-pointer h-full border-gray-300 w-full opacity-0 inset-0 absolute" @change="onInputChange">
        </label>
      </div>
    </DropZone>
  </div>
</template>
