import { IForageRockSession } from "../type"

export async function login({ accessId, password }:
	{ accessId: string, password: string }):
	Promise<IForageRockSession> {
	try {
		const response = await fetch('/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({ accessId, password }),
			headers: { 'Content-Type': 'application/json' },
		})

		if (!response.ok) {
			throw new Error('HTTP status ' + response.status)
		}

		return await response.json()
	}
	catch (err) {
		console.log(err)
		throw new Error(`login error ${err}`)
	}
}