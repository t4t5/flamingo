import { CSS } from "@stitches/react"
import { ReactNode } from "react"
import { Link } from "react-router-dom"

import { Box } from "@components/ui"

import ActivityIcon from "@icons/nav/activity.svg"
import ProfileIcon from "@icons/nav/profile.svg"
import SettingsIcon from "@icons/nav/settings.svg"

const NAV_HEIGHT = 68

export const Footer = ({
  children,
  css,
}: {
  children?: ReactNode
  css?: CSS
}) => {
  return (
    <Box
      flex
      justifyContent="between"
      alignItems="center"
      css={{
        backgroundColor: "$bgSecondary",
        boxShadow:
          "0px -1px 10px rgba(0, 0, 0, 0.07), inset 0px 1px 0px rgba(206, 176, 255, 0.04)",
        height: NAV_HEIGHT,
        flex: `0 0 ${NAV_HEIGHT}px`,
        ...css,
      }}
    >
      {children}
    </Box>
  )
}

export default function Nav({ currentTab }: { currentTab?: string }) {
  return (
    <Footer>
      <Tab tab="/profile" currentTab={currentTab}>
        <ProfileIcon />
      </Tab>
      <Tab tab="/activity" currentTab={currentTab}>
        <ActivityIcon />
      </Tab>
      <Tab tab="/settings" currentTab={currentTab}>
        <SettingsIcon />
      </Tab>
    </Footer>
  )
}

export const Tab = ({
  tab,
  currentTab,
  children,
}: {
  tab: string
  currentTab?: string
  children: ReactNode
}) => {
  const isActive = tab === currentTab

  return (
    <Link
      to={tab}
      style={{
        flexGrow: 1,
        height: "100%",
      }}
    >
      <Box
        flex
        alignItems="center"
        justifyContent="center"
        css={{
          height: "100%",
          position: "relative",
          cursor: "pointer",
          opacity: isActive ? 1 : 0.6,

          "&:hover": {
            opacity: 1,
          },
        }}
      >
        {isActive && (
          <Box
            css={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              backgroundColor: "$accent",
              borderRadius: 2,
            }}
          />
        )}

        {children}
      </Box>
    </Link>
  )
}
