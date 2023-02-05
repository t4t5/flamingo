import { styled } from "@theme"

export const IconButton = styled("button", {
  size: 30,
  background: "none",
  border: "none",
  borderRadius: "$circle",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:not([disabled]):hover": {
    backgroundColor: "$buttonIconHover",
    cursor: "pointer",
  },
})
