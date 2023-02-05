import { Box } from "@components/ui"

export default function MiddleEllipsis({
  charsAtEnd = 5,
  children,
}: {
  charsAtEnd?: number
  children: string
}) {
  const suffix = children.slice(-charsAtEnd)
  const rest = children.slice(0, children.length - charsAtEnd)

  return (
    <Box
      flex
      css={{
        flexWrap: "nowrap",
        justifyContent: "flex-start",
      }}
    >
      <Box
        css={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          flexShrink: 1,
        }}
      >
        {rest}
      </Box>
      <Box
        css={{
          whiteSpace: "nowrap",
          flexBasis: "content",
          flexGrow: 0,
          flexShrink: 0,
        }}
      >
        {suffix}
      </Box>
    </Box>
  )
}
