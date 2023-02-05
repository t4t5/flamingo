import { CSS } from "@stitches/react"
import { styled, SPACE_VALUES, Space } from "@theme"

const createVariants = (key: string) => {
  const variants = SPACE_VALUES.reduce((acc, curr) => {
    acc[curr] = {
      [key]: `$${curr}`,
    }
    return acc
  }, {}) as Record<Space, CSS>

  return variants
}

export const marginVariants = {
  mt: {
    ...createVariants("marginTop"),
  },
  mb: {
    ...createVariants("marginBottom"),
  },
  ml: {
    ...createVariants("marginLeft"),
  },
  mr: {
    ...createVariants("marginRight"),
  },
  mx: {
    ...createVariants("mx"),
  },
  my: {
    ...createVariants("my"),
  },
}

const paddingVariants = {
  pt: {
    ...createVariants("paddingTop"),
  },
  pb: {
    ...createVariants("paddingBottom"),
  },
  pl: {
    ...createVariants("paddingLeft"),
  },
  pr: {
    ...createVariants("paddingRight"),
  },
  px: {
    ...createVariants("px"),
  },
  py: {
    ...createVariants("py"),
  },
}

export const Box = styled("div", {
  variants: {
    ...marginVariants,
    ...paddingVariants,

    gap: createVariants("gap"),

    flex: {
      true: {
        display: "flex",
      },
    },

    inline: {
      true: {
        display: "inline-flex",
      },
    },

    col: {
      true: {
        flexDirection: "column",
      },
    },

    flexDirection: {
      row: {
        flexDirection: "row",
      },
      column: {
        flexDirection: "column",
      },
      rowReverse: {
        flexDirection: "row-reverse",
      },
      columnReverse: {
        flexDirection: "column-reverse",
      },
    },

    alignItems: {
      start: {
        alignItems: "flex-start",
      },
      center: {
        alignItems: "center",
      },
      end: {
        alignItems: "flex-end",
      },
      stretch: {
        alignItems: "stretch",
      },
      baseline: {
        alignItems: "baseline",
      },
    },

    justifyContent: {
      start: {
        justifyContent: "flex-start",
      },
      center: {
        justifyContent: "center",
      },
      end: {
        justifyContent: "flex-end",
      },
      between: {
        justifyContent: "space-between",
      },
      around: {
        justifyContent: "space-around",
      },
    },

    wrap: {
      true: {
        flexWrap: "wrap",
      },
    },

    grow: {
      true: {
        flexGrow: 1,
        minWidth: 0,
      },
    },
  },
})
