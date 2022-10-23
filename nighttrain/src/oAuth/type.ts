export enum StorageKey {
	Session = 'forgeRockSession',
	accessToken = 'accessToken',
	refreshToken = 'refreshToken'
}

export interface IForageRockSession {
	username: string
	session: string
	expiry: string
}