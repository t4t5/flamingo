import { keyframes, styled } from "@theme"

const shimmer = keyframes({
  "100%": {
    transform: "translateX(100%)",
  },
})

export const Skeleton = styled("div", {
  position: "relative",
  overflow: "hidden",

  // Fixes overflow-radius bug
  // https://stackoverflow.com/a/64885552/2679245:
  transform: "translateZ(0)",
  backgroundColor: "$bgTertiary",

  "&::after": {
    content: "",
    position: "absolute",
    inset: 0,
    transform: "translateX(-100%)",
    background:
      "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 20%, rgba(255, 255, 255, 0.1) 60%, rgba(255, 255, 255, 0))",
    animation: `${shimmer.toString()} 1s infinite`,
  },
})

export const SkeletonCard = styled(Skeleton, {
  backgroundColor: "$bgSecondary",
  borderRadius: "$md",
  height: 80,
})

export const SkeletonText = styled(Skeleton, {
  borderRadius: "$rounded",
  display: "inline-block",
  width: "50%",
  height: 14,
})
