import copy from "clipboard-copy"
import { useEffect, useState } from "react"

import { Box, Text, Input, IconButton } from "@components/ui"

import { LoggedInPage } from "@src/utils/Layout"

import CheckIcon from "@icons/check.svg"
import CopyIcon from "@icons/copy.svg"
import EyeClosedIcon from "@icons/eye-closed.svg"
import EyeOpenIcon from "@icons/eye-open.svg"
import WarningIcon from "@icons/warning.svg"

const SettingsPrivkeyScreen = () => {
  const [copied, setCopied] = useState(false)
  const [reveal, setReveal] = useState(false)
  const [nsec, setNsec] = useState<string | null>(null)

  useEffect(() => {
    void getNsec()
  }, [])

  const getNsec = async () => {
    const message = {
      method: "get_nsec",
    }

    const _nsec = await chrome.runtime.sendMessage(message)

    if (_nsec) {
      setNsec(_nsec)
    }
  }

  const onCopyKey = () => {
    void copy(nsec)
    setCopied(true)
  }

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    }
  }, [copied])

  return (
    <LoggedInPage
      title="View private key"
      currentTab="/settings"
      backLink="/settings"
    >
      <Box flex col gap="16" alignItems="center" my="24">
        <WarningIcon />

        <Text align="center">
          If someone steals your private key, they will be able to log in as
          you.
        </Text>

        <Text align="center">
          Make sure you store it somewhere safe and don’t reveal it in a public
          place.
        </Text>
      </Box>

      <Box
        css={{
          position: "relative",
        }}
      >
        <Input type={reveal ? "text" : "password"} value={nsec} readOnly />

        <Box
          flex
          gap="8"
          alignItems="center"
          mr="8"
          pl="24"
          css={{
            background:
              "linear-gradient(270deg, #1C1C1F 0%, #1C1C1F 80%, rgba(28, 28, 31, 0) 100%)",
            position: "absolute",
            right: 0,
            bottom: 4,
            top: 4,
          }}
        >
          <IconButton onClick={() => setReveal(!reveal)}>
            {reveal ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </IconButton>
          <IconButton onClick={onCopyKey}>
            {copied ? <CheckIcon /> : <CopyIcon />}
          </IconButton>
        </Box>
      </Box>
    </LoggedInPage>
  )
}

export default SettingsPrivkeyScreen
