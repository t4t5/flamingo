import { MessageData } from "@src/utils/types"

const script = document.createElement("script")
script.setAttribute("async", "false")
script.setAttribute("type", "text/javascript")
script.setAttribute(
  "src",
  chrome.runtime.getURL("/assets/js/nostr-provider.js"),
)
document.head.appendChild(script)

// Send to background worker:
window.addEventListener("message", async (evt: MessageEvent<MessageData>) => {
  const { data, source } = evt

  if (data.target === "flamingo-worker") {
    const { requestData } = data
    const responseData = await chrome.runtime.sendMessage(requestData)

    // Reply to client:
    const responseMessage: MessageData = {
      target: "flamingo-client",
      requestData,
      responseData,
    }

    source.postMessage(responseMessage)
  }
})

// Exports nostr-provider as a separate file in "dist":
import("./nostr-provider")
