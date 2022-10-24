import { axiosOAuth } from '../oAuth/api/axiosOAuth'

export async function getAccs({ keyword }: { keyword: string }) {
	return await fetch(`/api/acc/${keyword}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("HTTP status " + response.status)
			}

			return response.json()
		})
		.catch((err) => {
			console.log(err)
		})
}

export const getAcc2 = async (keyword: string) => {
	try {
		const response = await axiosOAuth.post(`/acc/${keyword}`,
			{})

		if (response.status !== 200) {
			throw new Error("HTTP status " + response.status)
		}

		return response.data
	}
	catch (err) {
		console.log(err)
		throw new Error(`acc fetch error: ${err}`)
	}
}