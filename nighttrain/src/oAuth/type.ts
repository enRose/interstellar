export enum StorageKey {
	Session = 'forgeRockSession',
	AuthTokens = 'authTokens',
}

export interface IForageRockSession {
	username: string
	session: string
	expiry: string
}