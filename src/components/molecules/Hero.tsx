import logoUrl from "@assets/images/logo.png"

import { Box, Text } from "@components/ui"

export default function Hero({ text }: { text: string }) {
  return (
    <Box
      flex
      col
      alignItems="center"
      css={{
        gap: "35px",
        marginTop: 68,
        marginBottom: 48,
      }}
    >
      <Box
        css={{
          size: "116px",
          backgroundImage: `url(${logoUrl})`,
          backgroundSize: "cover",
          borderRadius: "$circle",
          filter: "drop-shadow(0px 2px 10px rgba(248, 103, 233, 0.26))",
        }}
      />

      <Text size="lg" weight="semiBold">
        {text}
      </Text>
    </Box>
  )
}
