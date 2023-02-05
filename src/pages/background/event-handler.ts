import {
  getEventHash,
  nip19,
  signEvent,
  type Event as NostrEvent,
} from "nostr-tools"

import { WINDOW_WIDTH, WINDOW_HEIGHT } from "@theme/globalStyles"

import { RequestData } from "@src/utils/types"

import { getNpub, getNsec, storeNsec, clearAccounts } from "./storage"

console.log("background loaded")

export const nsecOrPrivkeyToNsec = async (input: string) => {
  if (input.startsWith("nsec")) {
    return input
  } else {
    return nip19.nsecEncode(input)
  }
}

type SendResponseFunc = (event: NostrEvent) => void

const signRequests: Record<
  string,
  {
    sendResponse: SendResponseFunc
    windowId: number
  }
> = {}

const listener = () => {
  chrome.runtime.onMessage.addListener(
    (message: Omit<RequestData, "id">, _sender, sendResponse) => {
      const { method, data } = message

      switch (method) {
        case "get_npub": {
          getNpub().then((npub) => {
            sendResponse(npub)
          })

          // Needs to return "true" when using async
          return true
        }

        case "get_public_key": {
          getNpub().then((npub) => {
            if (!npub) return sendResponse(null)

            const { data: pubkey } = nip19.decode(npub)
            sendResponse(pubkey)
          })

          return true
        }

        case "get_nsec": {
          getNsec().then((nsec) => {
            sendResponse(nsec)
          })

          // Needs to return "true" when using async
          return true
        }

        case "sign_event": {
          const event = data.event as NostrEvent
          const host = data.host as string

          getNsec().then(async (nsec) => {
            if (!nsec) return sendResponse(null)

            const { data: privkey } = nip19.decode(nsec)

            if (typeof privkey !== "string") return sendResponse(null)

            event.id = getEventHash(event)
            event.sig = signEvent(event, privkey)

            const qs = new URLSearchParams({
              signRequestId: event.id,
              event: JSON.stringify(event),
              host,
            })

            // To avoid scrolling window:
            const OS_BAR_HEIGHT = 28

            const chromeWindow = await chrome.windows.create({
              url: chrome.runtime.getURL(
                `/src/pages/prompt/index.html?${qs.toString()}`,
              ),
              type: "popup",
              left: 100,
              width: WINDOW_WIDTH,
              height: WINDOW_HEIGHT + OS_BAR_HEIGHT,
            })

            // "sendResponse" will be called by "sign_event_confirm"
            signRequests[event.id] = {
              sendResponse,
              windowId: chromeWindow.id,
            }

            // TODO: If confirmation isn't needed, we can send this directly
            // sendResponse(null);
          })

          return true
        }

        case "sign_event_confirm": {
          const event = data as NostrEvent

          const { sendResponse, windowId } = signRequests[event.id]
          sendResponse(event)

          chrome.windows.remove(windowId)

          return event
        }

        case "logout": {
          clearAccounts().then(() => {
            sendResponse(null)
          })

          return true
        }

        case "import_privkey": {
          const { privkey: input } = data as { privkey: string }

          nsecOrPrivkeyToNsec(input)
            .then((nsec) => {
              return storeNsec(nsec)
            })
            .then((npub) => {
              sendResponse(npub)
            })
            .catch((err) => {
              console.error(err)
              sendResponse(null)
            })

          return true
        }

        default: {
          console.error("Unknown method", message.method)
        }
      }
    },
  )
}

export { listener }
