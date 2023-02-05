import ProfileInfo from "@components/molecules/ProfileInfo"
import { Box } from "@components/ui"

import { useAuth } from "@src/utils/AuthProvider"
import { LoggedInPage } from "@src/utils/Layout"

const ProfileScreen = () => {
  const { pubkey } = useAuth()

  return (
    <LoggedInPage title="Nostr Account" currentTab="/profile">
      <Box
        css={{
          marginTop: 70,
        }}
      >
        {pubkey ? <ProfileInfo pubkey={pubkey} /> : null}
      </Box>
    </LoggedInPage>
  )
}

export default ProfileScreen
