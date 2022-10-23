import { response, Router } from "express"
import { fetch } from "cross-fetch"

const router = Router()

const AIC_URL = "https://api.artic.edu/api/v1/artworks/search?q="

const getAccs = async (req: any, res = response) => {
	const { id } = req.params

	try {
		const resp = await fetch(
			`${AIC_URL}${id}&limit=15&fields=id,title,image_id,date_display,artist_display,place_of_origin,medium_display`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)

		if (resp.status >= 400) {
			throw new Error("Bad response from server")
		}

		const { data = [] } = await resp.json()
		const dataWithUrls = data.map((image:any) => ({
			...image,
			image_url: `https://www.artic.edu/iiif/2/${image.image_id}/full/843,/0/default.jpg`,
		}));

		res.json(dataWithUrls)

	} catch (err) {
		console.error(err)
	}
}

router.get("/:id", getAccs)

module.exports = router