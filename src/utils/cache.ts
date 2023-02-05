import { Metadata } from "nostr-react"

const PROFILES_KEY = "flamingo:cachedProfiles"

export const getCachedProfile = (npub: string) => {
  const localStorageData = localStorage.getItem(PROFILES_KEY)

  if (!localStorageData) return null

  const cachedProfiles = JSON.parse(localStorageData)

  return cachedProfiles[npub]
}

export const cacheProfile = (npub: string, profile: Metadata) => {
  const localStorageData = localStorage.getItem(PROFILES_KEY)

  let cachedProfiles = {}

  if (localStorageData) {
    cachedProfiles = JSON.parse(localStorageData)
  }

  cachedProfiles[npub] = profile

  localStorage.setItem(PROFILES_KEY, JSON.stringify(cachedProfiles))
}
