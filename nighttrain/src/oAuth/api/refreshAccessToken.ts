import mem from 'mem'
import { StorageKey } from '../type'
import { axiosPublic } from './axiosOAuth'

const refreshAccessToken = async () => {
  try {
		const authTokens = JSON.parse(
			localStorage.getItem(StorageKey.AuthTokens)??'')

    const response = await axiosPublic.post('/token/refresh', {
      refreshToken: authTokens?.refreshToken,
    })

    const { session } = response.data

		authTokens.accessToken = session.accessToken

    localStorage.setItem(StorageKey.AuthTokens, 
			JSON.stringify(authTokens))

    return session.accessToken
  } catch (error) {
    localStorage.removeItem(StorageKey.AuthTokens)
  }
}

const maxAge = 10000

export const memoizedAccessTokenRefresh = 
  mem(refreshAccessToken, {
  maxAge,
})