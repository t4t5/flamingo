import { createRoot } from "react-dom/client"
import refreshOnUpdate from "virtual:reload-on-update-in-view"

import App from "./App"

refreshOnUpdate("pages/popup")

function init() {
  const appContainer = document.querySelector("#app-container")

  if (!appContainer) {
    throw new Error("Can not find #app-container")
  }

  const root = createRoot(appContainer)

  root.render(<App />)
}

init()
