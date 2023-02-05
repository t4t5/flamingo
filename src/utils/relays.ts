const RELAYS_KEY = "flamingo:relays"

export const DEFAULT_RELAY_URLS = [
  "wss://relay.damus.io",
  "wss://nostr-pub.wellorder.net",
  "wss://relay.nostr.ch",
  "wss://relay.snort.social",
  "wss://eden.nostr.land",
  "wss://nostr.onsats.org",
]

export const getRelayUrls = () => {
  const localStorageRelays = localStorage.getItem(RELAYS_KEY)

  const relayUrls = localStorageRelays
    ? (JSON.parse(localStorageRelays) as string[])
    : DEFAULT_RELAY_URLS

  return relayUrls
}

export const saveRelays = (relayUrls: string[]) => {
  localStorage.setItem(RELAYS_KEY, JSON.stringify(relayUrls))
}
