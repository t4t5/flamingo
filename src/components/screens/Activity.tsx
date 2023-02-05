import { useNostrEvents } from "nostr-react"
import { groupBy } from "remeda"

import EventCard from "@components/molecules/EventCard"
import { Box, SkeletonCard, SkeletonText, Text } from "@components/ui"

import { useAuth } from "@src/utils/AuthProvider"
import { LoggedInPage } from "@src/utils/Layout"
import { formatDate } from "@src/utils/date"

const KINDS_TO_TRACK = [0, 1]

const ActivityScreen = () => {
  const { pubkey } = useAuth()

  const { events, isLoading } = useNostrEvents({
    filter: {
      limit: 50,
      authors: [pubkey],
      kinds: KINDS_TO_TRACK,
    },
    enabled: !!pubkey,
  })

  const eventsWithDate = events.map((event) => {
    const date = formatDate(event.created_at)

    return {
      ...event,
      date,
    }
  })

  const groupedEvents = groupBy(eventsWithDate, (event) => event.date)

  return (
    <LoggedInPage title="Recent Activity" currentTab="/activity">
      {!events.length && !isLoading && (
        <Box flex col grow alignItems="center" justifyContent="center" gap="16">
          <Text
            css={{
              fontSize: 40,
            }}
          >
            🤙
          </Text>
          <Text size="md" color="secondary">
            Nothing here yet
          </Text>
        </Box>
      )}

      <Box flex col gap="12">
        {isLoading && (
          <>
            <SkeletonText
              css={{
                marginTop: 16,
              }}
            />

            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}

        {Object.values(groupedEvents).map((events) => {
          return (
            <>
              <Text mt="16" color="secondary">
                {events[0]?.date}
              </Text>

              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </>
          )
        })}
      </Box>
    </LoggedInPage>
  )
}

export default ActivityScreen
