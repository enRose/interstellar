export enum StorageKey {
	ForgeRockSession = 'forgeRockSession',
	AuthTokens = 'authTokens',
}

export interface IForageRockSession {
	username: string
	session: string
	expiry: string
}