import { useCallback, useEffect, useState } from "react"
import { IToken, token } from "../api/token"
import { IForageRockSession, StorageKey } from "../type"

export const useToken = (forgeRockSession:IForageRockSession) => {
  const [loading, setLoading] = useState<boolean|undefined>()
	const [error, setError] = useState<any>()
	const [tokens, setTokens] = useState<IToken | undefined>()
	
	useEffect(() => {
		if(!forgeRockSession) {
			return
		}

		const getTokens = async () => {
			setLoading(true)
			const tokens = await token(forgeRockSession.session)
			
			window.localStorage.removeItem(StorageKey.ForgeRockSession)
			window.localStorage.setItem(StorageKey.AuthTokens, JSON.stringify(tokens))

			setTokens(tokens)
			setLoading(false)
		}

		getTokens().catch(e => {
			setLoading(undefined)
			setError(e)
		})
	}, [forgeRockSession])

	return [tokens, loading, error]
}