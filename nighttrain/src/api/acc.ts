export async function getAccs({ keyword }:{keyword:string}) {
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