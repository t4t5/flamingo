import Popup from "@pages/prompt/Prompt"
import { globalCss } from "@theme"
import { NostrProvider } from "nostr-react"
import { createRoot } from "react-dom/client"
import refreshOnUpdate from "virtual:reload-on-update-in-view"

import globalStyles from "@theme/globalStyles"

import { getRelayUrls } from "@src/utils/relays"

const globalPromptStyles = globalCss({
  body: {
    width: "auto",
    height: "100vh",
  },
})

refreshOnUpdate("pages/prompt")

function init() {
  const appContainer = document.querySelector("#app-container")

  if (!appContainer) {
    throw new Error("Can not find #app-container")
  }

  const root = createRoot(appContainer)

  globalStyles()
  globalPromptStyles()

  root.render(
    <NostrProvider relayUrls={getRelayUrls()} debug={true}>
      <Popup />
    </NostrProvider>,
  )
}

init()
