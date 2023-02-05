import { styled } from "@theme"

import { marginVariants } from "./Box"

export const Text = styled("p", {
  variants: {
    ...marginVariants,

    size: {
      sm: {
        fontSize: "$sm",
      },
      md: {
        fontSize: "$md",
      },
      lg: {
        fontSize: "$lg",
      },
    },

    weight: {
      medium: {
        fontWeight: "$medium",
      },
      semiBold: {
        fontWeight: "$semiBold",
      },
    },

    color: {
      primary: {
        color: "$textPrimary",
      },

      secondary: {
        color: "$textSecondary",
      },

      accent: {
        color: "$accent",
      },

      danger: {
        color: "$textDanger",
      },
    },

    align: {
      left: {
        textAlign: "left",
      },
      center: {
        textAlign: "center",
      },
      right: {
        textAlign: "right",
      },
    },

    break: {
      true: {
        wordBreak: "break-word",
      },
    },

    grow: {
      true: {
        flexGrow: 1,
        minWidth: 0,
      },
    },
  },

  defaultVariants: {
    size: "sm",
    color: "primary",
  },
})
