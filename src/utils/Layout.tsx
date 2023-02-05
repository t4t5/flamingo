import { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Nav from "@components/molecules/Nav"
import { Box, Text, IconButton } from "@components/ui"

import { useAuth } from "@src/utils/AuthProvider"

import BackIcon from "@icons/back.svg"

interface Props {
  title?: string
  backLink?: string
  children: ReactNode
}

export const LoggedOutPage = ({ children, ...props }: Props) => {
  const navigate = useNavigate()

  const { loggedIn } = useAuth()

  useEffect(() => {
    if (loggedIn) {
      navigate("/profile")
    }
  }, [loggedIn])

  return <Layout {...props}>{children}</Layout>
}

interface LoggedInProps extends Props {
  currentTab?: string
}

export const LoggedInPage = ({
  children,
  currentTab,
  ...props
}: LoggedInProps) => {
  const navigate = useNavigate()

  const { loggedIn } = useAuth()

  useEffect(() => {
    if (!loggedIn) {
      navigate("/")
    }
  }, [loggedIn])

  return (
    <Box
      flex
      col
      css={{
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Layout {...props}>{children}</Layout>
      <Nav currentTab={currentTab} />
    </Box>
  )
}

const TITLE_BAR_HEIGHT = 58

export const Layout = ({ title, backLink, children }: Props) => {
  const navigate = backLink ? useNavigate() : undefined

  return (
    <Box
      grow
      flex
      col
      css={{
        minHeight: 0,
      }}
    >
      {title ? (
        <Box
          flex
          justifyContent="between"
          alignItems="center"
          px="16"
          css={{
            height: TITLE_BAR_HEIGHT,
            flex: `0 0 ${TITLE_BAR_HEIGHT}px`,
          }}
        >
          <IconButton
            disabled={!backLink}
            onClick={() => {
              backLink ? navigate(backLink) : null
            }}
          >
            {backLink ? <BackIcon /> : null}
          </IconButton>

          <Text size="md">{title}</Text>

          {/* For spacing */}
          <IconButton disabled />
        </Box>
      ) : null}

      <Box
        px="16"
        flex
        col
        grow
        css={{
          overflow: "auto",
          paddingBottom: "$16",
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
