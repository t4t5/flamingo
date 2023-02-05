import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"

import { Card, Text } from "@components/ui"

import ArrowIcon from "@icons/forward.svg"

export default function SettingOption({
  children,
  link,
  danger,
  onClick,
}: {
  children: ReactNode
  link?: string
  danger?: boolean
  onClick?: () => void
}) {
  const navigate = useNavigate()

  const _onClick = () => {
    if (link) {
      navigate(link)
    } else {
      onClick()
    }
  }

  return (
    <Card
      clickable
      flex
      alignItems="center"
      justifyContent="between"
      px="16"
      py="12"
      css={{
        height: 54,
      }}
      onClick={_onClick}
    >
      <Text
        color={danger ? "danger" : "primary"}
        grow
        size="md"
        align={link ? "left" : "center"}
      >
        {children}
      </Text>

      {!!link && <ArrowIcon />}
    </Card>
  )
}
