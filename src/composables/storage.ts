import { useStorageLocal } from '~/composables/useStorageLocal'
import { useNFTStorage } from "@rwa/web3-storage";

export const storageDemo = useStorageLocal('webext-demo', 'Storage Demo')
export const encryptedMnemonic = useStorageLocal('encryptedMnemonic', '')

export const { getJson, getStatus, storeJson } = useNFTStorage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIxMmZkRTRBOEFhY0RCZWE3RWFkRGNFMGU1NkI0NTFDQzdlNTM2QjYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NzM4MTgzMDU2MywibmFtZSI6Ik5UQiJ9.Yj9ie65LXh6t6QECtGzKViX-AeTiAHnVoYybY3qfqNk",
});


export const parseURIData = async (cid) => {
  const token = await getJson(cid);
  const status = await getStatus(cid);
  return {
    ...token,
    createdAt: status.created,
  };
}