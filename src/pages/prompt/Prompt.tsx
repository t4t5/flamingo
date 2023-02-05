import { nip19, type Event as NostrEvent, type Kind } from "nostr-tools"

import { Footer } from "@components/molecules/Nav"
import { Card, Box, Text, Button } from "@components/ui"

import MiddleEllipsis from "@src/components/molecules/MiddleEllipsis"
import { Layout } from "@src/utils/Layout"

enum ExtraKind {
  Challenge = 22242,
}

type ExtendedKind = Kind | ExtraKind

const KIND_TO_PROMPT_ACTION = {
  "0": "Update profile",
  "1": "Send message",
  "3": "Update contact list",
  "22242": "Authenticate",
}

const getContent = (content: string) => {
  try {
    return JSON.parse(content) as Record<string, unknown>
  } catch {
    return content
  }
}

const Preview = ({ event }: { event: NostrEvent }) => {
  const kind = event.kind as ExtendedKind
  const content = getContent(event.content)

  if (kind === 3) {
    const pubkeys = event.tags.map((tag) => tag[1])
    const npubs = pubkeys.map(nip19.npubEncode)

    return (
      <>
        {npubs.map((npub) => (
          <ValueRow key={npub}>{npub}</ValueRow>
        ))}
      </>
    )
  }

  if (kind === 22242) {
    const challengeTag = event.tags.find((tag) => tag[0] === "challenge")
    const challenge = challengeTag[1]

    return <DataRow label="Challenge" value={challenge} />
  }

  if (typeof content === "string") {
    return (
      <Text
        size="sm"
        break
        css={{
          padding: "$16",
        }}
      >
        {content}
      </Text>
    )
  }

  return (
    <>
      {Object.keys(content).map((key) => {
        const value = content[key]

        return <DataRow key={key} label={key} value={String(value)} />
      })}
    </>
  )
}

const Prompt = () => {
  const qs = new URLSearchParams(location.search)

  const host = qs.get("host")

  const stringEvent = qs.get("event")
  const eventToSign = JSON.parse(stringEvent) as NostrEvent

  console.log("Sign", stringEvent)

  const onSend = async () => {
    const message = {
      method: "sign_event_confirm",
      data: eventToSign,
    }

    await chrome.runtime.sendMessage(message)
  }

  return (
    <Box
      flex
      col
      css={{
        height: "100%",
      }}
    >
      <Layout title="Sign message">
        <Text size="sm" color="secondary" align="center" mb="24">
          {host}
        </Text>

        <Box flex col gap="12">
          <Text>{KIND_TO_PROMPT_ACTION[eventToSign.kind]}</Text>
          <Card>
            <Preview event={eventToSign} />
          </Card>
        </Box>
      </Layout>

      <Footer
        css={{
          px: "$24",
          gap: "$16",
        }}
      >
        <Button
          color="secondary"
          grow
          onClick={() => {
            window.close()
          }}
        >
          Cancel
        </Button>
        <Button onClick={onSend} grow>
          Approve
        </Button>
      </Footer>
    </Box>
  )
}

const DataRow = ({ label, value }: { label: string; value: string }) => {
  const isLong = value.length > 25

  return (
    <Box
      flex
      col={isLong}
      justifyContent="between"
      px="16"
      py="16"
      gap="16"
      css={{
        borderBottomColor: "$bgPrimary",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
      }}
    >
      <Text size="sm" color="secondary">
        {label}
      </Text>

      <Text size="sm" break>
        {value}
      </Text>
    </Box>
  )
}

const ValueRow = ({ children }: { children: string }) => {
  return (
    <Box
      flex
      justifyContent="between"
      px="16"
      py="16"
      gap="16"
      css={{
        borderBottomColor: "$bgPrimary",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
      }}
    >
      <Text
        size="sm"
        css={{
          overflow: "hidden",
        }}
      >
        <MiddleEllipsis>{children}</MiddleEllipsis>
      </Text>
    </Box>
  )
}

export default Prompt
