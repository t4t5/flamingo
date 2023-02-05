import { nip19 } from "nostr-tools"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

interface AuthContextType {
  loggedIn: boolean
  npub?: string
  pubkey?: string
  loading: boolean
  onLogin: (privkey: string) => void
  onLogout: () => void
}

const AuthContext = createContext<AuthContextType>(null)

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false)
  const [npub, setNpub] = useState<string | null>(null)

  const { data: pubkey } = npub ? nip19.decode(npub) : { data: null }

  const loggedIn = !!npub

  useEffect(() => {
    void getPubkey()
  }, [])

  const getPubkey = async () => {
    setLoading(true)

    const message = {
      method: "get_npub",
    }

    const _npub = await chrome.runtime.sendMessage(message)

    setLoading(false)

    if (_npub) {
      setNpub(_npub)
    }
  }

  const onLogin = async (privkey: string) => {
    setLoading(true)

    const message = {
      method: "import_privkey",
      data: {
        privkey,
      },
    }

    const rsp = await chrome.runtime.sendMessage(message)

    if (rsp) {
      getPubkey()
    } else {
      setLoading(false)
      alert("Invalid private key!")
    }
  }

  const onLogout = async () => {
    const message = {
      method: "logout",
    }

    await chrome.runtime.sendMessage(message)

    setNpub(null)
  }

  const value: AuthContextType = {
    npub,
    pubkey: pubkey ? String(pubkey) : null,
    loading,
    loggedIn,
    onLogin,
    onLogout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
