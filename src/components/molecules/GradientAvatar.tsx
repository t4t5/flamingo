import makeAvatar from "gradient-avatar"

import { Box } from "@components/ui"

const GradientAvatar = ({ id }: { id: string }) => {
  const avatarSvg = makeAvatar(id)
  const avatarHtml = { __html: avatarSvg }

  return (
    <Box
      dangerouslySetInnerHTML={avatarHtml}
      css={{
        borderRadius: "$circle",
        overflow: "hidden",
        size: 97,
      }}
    />
  )
}

export default GradientAvatar
