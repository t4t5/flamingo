import copy from "clipboard-copy"
import { useEffect, useState } from "react"

import MiddleEllipsis from "@components/molecules/MiddleEllipsis"
import { Box, Text } from "@components/ui"

import CheckIcon from "@icons/check.svg"
import CopyIcon from "@icons/copy.svg"

export default function CopyableNpub({ npub }: { npub: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    }
  }, [copied])

  const onCopyAddress = () => {
    void copy(npub)
    setCopied(true)
  }

  return (
    <Box
      flex
      gap="8"
      alignItems="center"
      onClick={onCopyAddress}
      css={{
        maxWidth: "100%",
        padding: "$8 $12",
        borderRadius: "$rounded",
        overflow: "hidden",
        cursor: "pointer",

        "&:hover": {
          backgroundColor: "$buttonIconHover",
        },
      }}
    >
      <Text
        size="sm"
        color="secondary"
        css={{
          minWidth: 0,
        }}
      >
        <MiddleEllipsis>{npub}</MiddleEllipsis>
      </Text>

      <Box
        flex
        alignItems="center"
        justifyContent="center"
        css={{
          flex: "0 0 20px",
        }}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Box>
    </Box>
  )
}
