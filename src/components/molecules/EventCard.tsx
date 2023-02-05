import { Event } from "nostr-tools"

import { Card, Box, Text } from "@components/ui"

import MessageIcon from "@icons/message.svg"
import ProfileIcon from "@icons/profile.svg"
import ReactionIcon from "@icons/reaction.svg"

const KIND_TO_ICON = {
  "0": <ProfileIcon />,
  "1": <MessageIcon />,
  "7": <ReactionIcon />,
}

const KIND_TO_TITLE = {
  "0": "Updated profile",
  "1": "Sent a message",
}

const renderContent = (kind: number, content: string) => {
  switch (kind) {
    case 0: {
      const fields = Object.keys(JSON.parse(content))
      return fields.join(", ")
    }

    default: {
      return content
    }
  }
}

export default function EventCard({ event }: { event: Event }) {
  const { kind, content } = event

  return (
    <Card
      css={{
        display: "flex",
        padding: "$12",
        gap: "$12",
      }}
    >
      <Box
        css={{
          flex: "0 0 22px",
        }}
      >
        {KIND_TO_ICON[kind]}
      </Box>

      <Box
        flex
        col
        css={{
          gap: "4px",
        }}
      >
        <Text size="md">{KIND_TO_TITLE[kind]}</Text>
        <Text
          color="secondary"
          break
          css={{
            ellipsis: 2,
          }}
        >
          {renderContent(kind, content)}
        </Text>
      </Box>
    </Card>
  )
}
