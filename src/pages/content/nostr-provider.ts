import { type Event as NostrEvent } from "nostr-tools"

import { MessageData, PromiseObject } from "@src/utils/types"

;(function () {
  const requests: Record<string, PromiseObject> = {}

  // Utility to send messages to background worker:
  function sendMessage<T>(data: Omit<MessageData["requestData"], "id">) {
    const requestId = Math.random().toString().slice(4)

    const message: MessageData = {
      target: "flamingo-worker",
      requestData: {
        id: requestId,
        ...data,
      },
    }

    // Send to content/index.js:
    window.postMessage(message, "*")

    return new Promise<T>((resolve, reject) => {
      requests[requestId] = { resolve, reject }
    })
  }

  const nostr = {
    async getPublicKey() {
      return sendMessage<string>({
        method: "get_public_key",
      })
    },

    async signEvent(event: NostrEvent) {
      return sendMessage<string>({
        method: "sign_event",
        data: {
          host: window.location.host,
          event,
        },
      })
    },
  }

  window.addEventListener("message", (evt: MessageEvent<MessageData>) => {
    const { data } = evt

    if (data.target === "flamingo-client") {
      const { requestData, responseData } = data
      // Connect response with request:
      const request = requests[requestData.id]
      request?.resolve(responseData)
    }
  })

  window.nostr = nostr
})()
