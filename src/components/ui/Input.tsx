import { styled } from "@theme"

export const Input = styled("input", {
  height: 43,
  backgroundColor: "$bgInput",
  borderRadius: "$md",
  border: "none",
  color: "$textPrimary",
  padding: "$8 $16",
  width: "100%",
  boxShadow: "inset 0px 0px 1px rgba(255, 255, 255, 0.35)",
  transition: "box-shadow 0.1s",
  fontSize: "$md",

  "&:focus": {
    outline: "none",
    boxShadow: "inset 0px 0px 1px white, 0px 0px 0px 1px white",
  },
})
