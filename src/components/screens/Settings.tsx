import Option from "@components/molecules/SettingOption"
import { Box } from "@components/ui"

import { useAuth } from "@src/utils/AuthProvider"
import { LoggedInPage } from "@src/utils/Layout"

const SettingsScreen = () => {
  const { onLogout } = useAuth()

  return (
    <LoggedInPage title="Settings" currentTab="/settings">
      <Box flex col gap="12">
        <Option link="/settings/relays">Update relays</Option>
        <Option link="/settings/privkey">View private key</Option>
        <Option danger onClick={onLogout}>
          Sign out
        </Option>
      </Box>
    </LoggedInPage>
  )
}

export default SettingsScreen
