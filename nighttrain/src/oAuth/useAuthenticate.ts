import { useEffect, useState } from "react"
import { useLocalStorage } from "../hook/useStorage"
import {login} from './authenticate'
import { IForageRockSession, StorageKey } from "./type"

export const useIsLoggedIn = () => {
	const [session] = useLocalStorage(StorageKey.Session, null)

	return !!session
}

export const useAuthenticate = (trigger:boolean, accessId: string, password: string) => {
	const [forgeRockSession, setForgeRockSession] 
		= useState<IForageRockSession>()
  const [loading, setLoading] = useState<boolean|undefined>()
	const [error, setError] = useState<any>()
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const [session, setSession, removeSession] 
		= useLocalStorage(StorageKey.Session, null)

	useEffect(() => {
		if(trigger !== true) {
			return
		}

		const logon = async () => {
			setLoading(true)
			const session = await login({accessId, password})
			setForgeRockSession(session)
			setSession(session)
			setIsLoggedIn(true)
			setLoading(false)
		}

		logon().catch(e => {
			setLoading(undefined)
			setError(e)
		})
	}, [trigger])

	return [forgeRockSession, loading, isLoggedIn, error]
}