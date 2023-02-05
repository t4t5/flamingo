import { nip19, getPublicKey } from "nostr-tools"

const ACCOUNT_STORAGE_KEY = "accounts"

interface AccountStorage {
  [ACCOUNT_STORAGE_KEY]: Record<string, string>
}

export const getNpub = async () => {
  const result = (await chrome.storage.local.get(
    ACCOUNT_STORAGE_KEY,
  )) as AccountStorage

  if (!result || !result[ACCOUNT_STORAGE_KEY]) {
    return null
  }

  const npubs = Object.keys(result[ACCOUNT_STORAGE_KEY])

  return npubs[0]
}

export const getNsec = async () => {
  const result = (await chrome.storage.local.get(
    ACCOUNT_STORAGE_KEY,
  )) as AccountStorage

  if (!result || !result[ACCOUNT_STORAGE_KEY]) {
    return null
  }

  const nsecs = Object.values(result[ACCOUNT_STORAGE_KEY])

  return nsecs[0]
}

export const storeNsec = async (nsec: string) => {
  const { data: privkey } = nip19.decode(nsec)

  if (typeof privkey !== "string") throw new Error("Invalid private key")

  if (privkey.length !== 64) {
    throw new Error("Invalid private key")
  }

  const pubkey = getPublicKey(privkey)
  const npub = nip19.npubEncode(pubkey)

  const storage: AccountStorage = {
    accounts: {
      [npub]: nsec,
    },
  }

  await chrome.storage.local.set(storage)

  return npub
}

export const clearAccounts = async () => {
  return chrome.storage.local.remove(ACCOUNT_STORAGE_KEY)
}
