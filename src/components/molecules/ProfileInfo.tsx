import { useProfile } from "nostr-react"
import { nip19 } from "nostr-tools"
import { queryProfile } from "nostr-tools/nip05"
import { useEffect, useState } from "react"

import CopyableNpub from "@components/molecules/CopyableNpub"
import GradientAvatar from "@components/molecules/GradientAvatar"
import { Box, Text, SkeletonText } from "@components/ui"

import { cacheProfile, getCachedProfile } from "@src/utils/cache"

import VerifiedIcon from "@icons/verified.svg"

export default function ProfileInfo({ pubkey }: { pubkey?: string }) {
  const npub = pubkey ? nip19.npubEncode(pubkey) : null

  const cachedProfile = getCachedProfile(npub)

  const { data: fetchedProfile, onDone } = useProfile({
    pubkey,
    enabled: !!pubkey,
  })

  const profile = fetchedProfile || cachedProfile

  const [isLoading, setIsLoading] = useState(!profile)
  const [verifiedUsername, setVerifiedUsername] = useState("")
  const [verifierDomain, setVerifierDomain] = useState("")

  const { name, picture, display_name: displayName, nip05 } = profile || {}

  const verifyProfile = async (str: string) => {
    const { pubkey: nip05Pubkey } = await queryProfile(str)

    if (pubkey === nip05Pubkey) {
      const [name, domain] = str.split("@")
      setVerifiedUsername(name)
      setVerifierDomain(domain)
    }
  }

  useEffect(() => {
    if (nip05) {
      void verifyProfile(nip05)
    }
  }, [nip05])

  onDone(() => {
    setIsLoading(false)
  })

  useEffect(() => {
    if (fetchedProfile) {
      cacheProfile(npub, fetchedProfile)
    }
  }, [fetchedProfile])

  const isVerified = verifiedUsername === name

  return (
    <Box flex col alignItems="center" gap="16">
      {picture ? (
        <Box
          css={{
            size: 97,
            backgroundColor: "$bgSecondary",
            borderRadius: "50%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${picture})`,
          }}
        />
      ) : (
        <GradientAvatar id={npub} />
      )}

      <Box
        flex
        col
        alignItems="center"
        gap="12"
        css={{
          maxWidth: "100%",
        }}
      >
        {displayName && (
          <Text size="lg" weight="semiBold" break>
            {displayName}
          </Text>
        )}

        {isLoading && (
          <SkeletonText
            css={{
              height: 14,
            }}
          />
        )}

        {name && (
          <Box flex gap="8" alignItems="center" justifyContent="center" wrap>
            <Text size="md" break>
              @{name}
            </Text>

            {isVerified && (
              <Box flex gap="6" alignItems="center">
                <VerifiedIcon />
                <Text size="md" color="accent">
                  {verifierDomain}
                </Text>
              </Box>
            )}
          </Box>
        )}

        {npub && <CopyableNpub npub={npub} />}
      </Box>
    </Box>
  )
}
