// https://github.com/LIT-Protocol/js-sdk/issues/141#issuecomment-1588941527
// for vite need add the config to fix node bug
// define: {
// 		'process.env.NODE_DEBUG': 'false',
// 		'window.global': 'globalThis'
// 	}
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import {SiweMessage} from 'siwe'

export const getAuthSig = async (account) => {
  const address = account.address
  const walletClient = getWalletClient(account)
  // Craft the SIWE message
  const domain = 'rwa-wallet.com';
  const uri = 'https://rwa-wallet.com/login';
  const statement =
    'Auth with RWA-Wallet.com';
  const siweMessage = new SiweMessage({
    domain,
    address,
    statement,
    uri,
    version: '1',
    chainId: CHAIN_ID,
  });
  const signedMessage = siweMessage.prepareMessage();
  const sig = await walletClient.signMessage({ message: signedMessage })

  const authSig = {
    sig,
    derivedVia: 'web3.eth.personal.sign',
    signedMessage,
    address,
  };

  return authSig
}

export const litHelper = ({ chain, litNodeClient, account }) => {
  const doEncryptedString = async (content, accessControlConditions) => {
    const authSig = await getAuthSig(account)
    const rz = await LitJsSdk.encryptString(
      content,
    )

    const encryptedSymmetricKeyUint8array = await litNodeClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey: rz.symmetricKey, // Uint8Array
      authSig,
      chain,
      permanent: false,
    })

    const encryptedString = await LitJsSdk.blobToBase64String(rz.encryptedString)
    const encryptedSymmetricKey = LitJsSdk.uint8arrayToString(encryptedSymmetricKeyUint8array, 'base16')

    return {
      encryptedString,
      encryptedSymmetricKey,
    }
  }

  const doDecryptString = async ({ encryptedSymmetricKey, encryptedString, accessControlConditions }) => {
    const toDecrypt = encryptedSymmetricKey
    accessControlConditions = JSON.stringify(accessControlConditions)
    accessControlConditions = JSON.parse(accessControlConditions)

    const authSig = await getAuthSig(account)

    try {
      const symmetricKey = await litNodeClient.getEncryptionKey({
        accessControlConditions,
        toDecrypt,
        chain,
        authSig,
      })
      const blob = LitJsSdk.base64StringToBlob(encryptedString)
      const decryptedString = await LitJsSdk.decryptString(blob, symmetricKey)

      return { decryptedString }
    }
    catch (err) {
      console.log('====> err :', err)
      return { err }
    }
  }

  const generateCondition = ({ contractAddress, ownerAddress, tokenId, unlockAmount }) => {
    const myselfCondition = {
      contractAddress: '',
      standardContractType: '',
      chain,
      method: '',
      parameters: [
        ':userAddress',
      ],
      returnValueTest: {
        comparator: '=',
        value: ownerAddress,
      },
    }
    const currentNFTCondition = {
      contractAddress,
      standardContractType: 'ERC1155',
      chain,
      method: 'balanceOf',
      parameters: [
        ':userAddress',
        tokenId,
      ],
      returnValueTest: {
        comparator: '>=',
        value: `${unlockAmount}`,
      },
    }

    const accessControlConditions = [
      myselfCondition,
      {
        operator: 'or',
      },
      currentNFTCondition,
    ]

    return accessControlConditions
  }

  return {
    doEncryptedString,
    doDecryptString,
    generateCondition,
  }
}
