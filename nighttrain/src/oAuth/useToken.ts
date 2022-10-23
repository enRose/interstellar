import { Session } from "inspector"
import { useEffect, useState } from "react"
import { useLocalStorage } from "../hook/useStorage"
import { IToken, token } from "./token"
import { StorageKey } from "./type"

export const useToken = () => {
  const [loading, setLoading] = useState<boolean|undefined>()
	const [error, setError] = useState<any>()
	const [tokens, setTokens] = useState<IToken | undefined>()

	const [session, setSession, removeSession] 
		= useLocalStorage(StorageKey.Session, null)

	const [accessToken, setAccessToken] = useLocalStorage(StorageKey.accessToken, null)
	const [refreshToken, setRefreshToken] = useLocalStorage(StorageKey.refreshToken, null)	

	useEffect(() => {
		if(!session) {
			return
		}

		const getTokens = async () => {
			setLoading(true)
			const tokens = await token(session)
			removeSession()
			setAccessToken(tokens.accessToken)
			setRefreshToken(tokens.refreshToken)
			setTokens(tokens)
			setLoading(false)
		}

		getTokens().catch(e => {
			setLoading(undefined)
			setError(e)
		})
	}, [session])

	return [tokens, loading, error]
}
