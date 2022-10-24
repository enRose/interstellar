export async function token(session: string): Promise<IToken> {
	try {
		const response = await fetch('/api/auth/token', {
			method: 'POST',
			body: JSON.stringify({session}),
			headers: { 'Content-Type': 'application/json' },
		})

		if (!response.ok) {
			throw new Error('HTTP status ' + response.status)
		}

		return await response.json()
	}
	catch (err) {
		console.log(err)
		throw new Error(`token exchange error ${err}`)
	}
}

export interface IToken {
	accessToken: string
	accessTokenExpiry: string
	refreshToken: string
	refreshTokenExpiry: string
}