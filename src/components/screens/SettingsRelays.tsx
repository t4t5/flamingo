import { useEffect, useState } from "react"

import { Box, Text, Card, Button, Input, IconButton } from "@components/ui"

import { LoggedInPage } from "@src/utils/Layout"
import { getRelayUrls, saveRelays } from "@src/utils/relays"

import TrashIcon from "@icons/trash.svg"

const SettingsRelaysScreen = () => {
  const [relayUrls, setRelayUrls] = useState(getRelayUrls())
  const [newRelayUrl, setNewRelayUrl] = useState("")

  const isValidNewRelay = newRelayUrl.startsWith("ws")

  const onAddRelay = () => {
    if (!isValidNewRelay) {
      alert("Invalid relay URL!")
    }

    setRelayUrls([...new Set([...relayUrls, newRelayUrl])])
    setNewRelayUrl("")
  }

  const onDeleteRelay = (deletedUrl: string) => {
    setRelayUrls(relayUrls.filter((url) => url !== deletedUrl))
  }

  useEffect(() => {
    if (relayUrls.length) {
      saveRelays(relayUrls)
    }
  }, [relayUrls.length])

  return (
    <LoggedInPage
      title="Update relays"
      currentTab="/settings"
      backLink="/settings"
    >
      <Box
        flex
        col
        gap="12"
        my="24"
        css={{
          width: "100%",
        }}
      >
        {relayUrls.map((relayUrl) => (
          <Card
            key={relayUrl}
            flex
            px="16"
            py="12"
            alignItems="center"
            justifyContent="between"
            css={{
              height: 54,
            }}
          >
            <Text>{relayUrl}</Text>

            <IconButton onClick={() => onDeleteRelay(relayUrl)}>
              <TrashIcon />
            </IconButton>
          </Card>
        ))}

        <Box flex gap="12" mt="12">
          <Input
            placeholder="wss://••••••"
            value={newRelayUrl}
            onChange={(e) => setNewRelayUrl(e.target.value)}
          />
          <Button onClick={onAddRelay} disabled={!isValidNewRelay}>
            Add
          </Button>
        </Box>
      </Box>
    </LoggedInPage>
  )
}

export default SettingsRelaysScreen
