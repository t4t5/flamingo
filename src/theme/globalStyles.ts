import { globalCss } from "@theme"

export const WINDOW_WIDTH = 358
export const WINDOW_HEIGHT = 538

export default globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    fontFamily: "$body",
  },

  body: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: "$bgPrimary",
    color: "$textPrimary",
    WebkitFontSmoothing: "antialiased",
  },

  "#app-container": {
    height: "100%",
  },

  a: {
    color: "inherit",
    textDecoration: "none",
  },
})
