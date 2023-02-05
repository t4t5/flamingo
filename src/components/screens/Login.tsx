import { generatePrivateKey } from "nostr-tools"
import { Link } from "react-router-dom"

import Hero from "@components/molecules/Hero"
import { Button, Box, Text } from "@components/ui"

import { useAuth } from "@src/utils/AuthProvider"
import { LoggedOutPage } from "@src/utils/Layout"

import AddIcon from "@icons/add.svg"
import KeyIcon from "@icons/key.svg"

const LoginScreen = () => {
  const { onLogin } = useAuth()

  const onGenerateAccount = () => {
    const privkey = generatePrivateKey()
    onLogin(privkey)
  }

  return (
    <LoggedOutPage title="Flamingo">
      <Hero text="Explore the world of Nostr" />

      <Box flex col gap="8" alignItems="center">
        <Link to="/import">
          <Button color="secondary">
            <KeyIcon />
            Import private key
          </Button>
        </Link>

        <Text color="secondary">or</Text>

        <Button onClick={onGenerateAccount}>
          <AddIcon />
          Generate new account
        </Button>
      </Box>
    </LoggedOutPage>
  )
}

export default LoginScreen
