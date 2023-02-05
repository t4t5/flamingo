import { createStitches } from "@stitches/react"

export const SPACE_VALUES = ["6", "8", "12", "16", "24"] as const
export type Space = typeof SPACE_VALUES[number]

const space = SPACE_VALUES.reduce((acc, value) => {
  acc[value] = `${value}px`
  return acc
}, {}) as Record<Space, string>

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      accent: "#F456A1",
      textPrimary: "#FFF",
      textSecondary: "rgba(255, 255, 255, 0.6)",
      textDanger: "#D54349",
      textPlaceholder: "rgba(255, 255, 255, 0.3)",
      bgPrimary: "#232328",
      bgSecondary: "#292932",
      bgTertiary: "#383844",
      bgInput: "#1C1C1F",
      buttonSecondary: "rgba(160, 152, 195, 0.3)",
      buttonIconHover: "rgba(0, 0, 0, 0.25)",
    },
    space,
    radii: {
      md: "11px",
      rounded: "9999px",
      circle: "50%",
    },
    fontSizes: {
      sm: "14px",
      md: "16px",
      lg: "20px",
    },
    fonts: {
      body: "Inter, 'Helvetica Neue', Helvetica, sans-serif",
    },
    fontWeights: {
      medium: 500,
      semiBold: 600,
    },

    shadows: {
      UNUSED: "0px 4px 4px rgba(0, 0, 0, 0.4)",
    },
  },

  media: {},

  utils: {
    size: (value: number | string) => ({
      width: value,
      height: value,
    }),

    my: (value: number | string) => ({
      marginTop: value,
      marginBottom: value,
    }),
    mx: (value: number | string) => ({
      marginLeft: value,
      marginRight: value,
    }),
    py: (value: number | string) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    px: (value: number | string) => ({
      paddingLeft: value,
      paddingRight: value,
    }),

    ellipsis: (numLines?: number | boolean) => {
      if (numLines && Number.isInteger(numLines) && numLines > 1) {
        return {
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": numLines,
          lineClamp: numLines,
          overflow: "hidden",
          whiteSpace: "normal",
        }
      } else {
        return {
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }
      }
    },
  },
})
