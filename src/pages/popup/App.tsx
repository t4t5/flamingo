import { NostrProvider } from "nostr-react"
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useOutlet,
} from "react-router-dom"

import globalStyles from "@theme/globalStyles"

import ActivityScreen from "@components/screens/Activity"
import LoginScreen from "@components/screens/Login"
import LoginImportScreen from "@components/screens/LoginImport"
import ProfileScreen from "@components/screens/Profile"
import SettingsScreen from "@components/screens/Settings"
import SettingsPrivkeyScreen from "@components/screens/SettingsPrivkey"
import SettingsRelaysScreen from "@components/screens/SettingsRelays"

import { AuthProvider } from "@src/utils/AuthProvider"
import { getRelayUrls } from "@src/utils/relays"

export const AuthLayout = () => {
  const outlet = useOutlet()

  return <AuthProvider>{outlet}</AuthProvider>
}

const router = createMemoryRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />}>
      <Route element={<LoginScreen />} path="/" />
      <Route element={<LoginImportScreen />} path="/import" />
      <Route element={<ProfileScreen />} path="/profile" />
      <Route element={<ActivityScreen />} path="/activity" />
      <Route element={<SettingsScreen />} path="/settings" />
      <Route element={<SettingsPrivkeyScreen />} path="/settings/privkey" />
      <Route element={<SettingsRelaysScreen />} path="/settings/relays" />
    </Route>,
  ),
)

export default function App() {
  globalStyles()

  return (
    <NostrProvider relayUrls={getRelayUrls()} debug={true}>
      <RouterProvider router={router} />
    </NostrProvider>
  )
}
