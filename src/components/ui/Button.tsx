import { styled } from "@theme"

export const Button = styled("button", {
  display: "flex",
  justifyContent: "center",
  gap: "$8",
  color: "$textPrimary",
  border: "none",
  padding: "$12 $16",
  fontWeight: "$semiBold",
  fontSize: "$md",
  borderRadius: "$md",
  cursor: "pointer",
  transition: "background-color 0.2s",

  "&[disabled]": {
    cursor: "not-allowed",
    pointerEvents: "none",
    opacity: 0.4,
  },

  variants: {
    color: {
      primary: {
        backgroundColor: "$accent",

        "&:not([disabled]):hover": {
          backgroundColor: "#FF6AB1",
        },
      },

      secondary: {
        backgroundColor: "$buttonSecondary",

        "&:not([disabled]):hover": {
          backgroundColor: "rgba(160, 152, 195, 0.5)",
        },
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
    color: "primary",
  },
})
