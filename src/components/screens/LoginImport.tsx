import { useState } from "react"

import Hero from "@components/molecules/Hero"
import { Button, Input, Box } from "@components/ui"

import { useAuth } from "@src/utils/AuthProvider"
import { LoggedOutPage } from "@src/utils/Layout"

const ImportScreen = () => {
  const { onLogin, loading } = useAuth()

  const [privkey, setPrivkey] = useState("")

  return (
    <LoggedOutPage title="Flamingo" backLink="/">
      <Hero text="Import your private key" />

      <Box flex col gap="24" alignItems="center">
        <Input
          type="password"
          placeholder="nsec••••••"
          value={privkey}
          onChange={(e) => setPrivkey(e.target.value)}
        />

        <Button
          disabled={loading}
          css={{ width: 200 }}
          onClick={() => {
            onLogin(privkey)
          }}
        >
          Import
        </Button>
      </Box>
    </LoggedOutPage>
  )
}

export default ImportScreen
