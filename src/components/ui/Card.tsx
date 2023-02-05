import { styled } from "@theme"

import { Box } from "@components/ui/Box"

export const Card = styled(Box, {
  backgroundColor: "$bgSecondary",
  borderRadius: "$md",

  variants: {
    clickable: {
      true: {
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "$bgTertiary",
        },
      },
    },
  },
})
