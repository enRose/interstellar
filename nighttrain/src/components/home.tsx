import React, { useState } from "react"
import {
	Container,
	Row,
	Form,
	Button,
	Alert,
	InputGroup,
	Spinner,
	Card,
} from "react-bootstrap"

import { getAccs } from '../api/acc'

function Home({ onLogout }: any) {
	const [isLoading, setIsLoading] = useState(false)
	const [noArtworksFound, setNoArtworksFound] = useState(false)
	const [keyword, setKeyword] = useState("")
	const [artworks, setArtworks] = useState([])

	const onChangeKeyword = (event: any) => {
		setKeyword(event.target.value)
	}

	const onSearchArtworks = async (event: any) => {
		event.preventDefault();
		setIsLoading(true);
		const artworks = await getAccs({ keyword });
		setArtworks(artworks);
		setNoArtworksFound(!artworks || !artworks.length);
		setIsLoading(false);
	};

	return (
		<Container fluid>
			<Row className="mt-2 mb-2 justify-content-end" noGutters>
				<Button variant="outline-danger" onClick={onLogout}>
					Log out
				</Button>
			</Row>
			<Row noGutters>
				<h1>Welcome!</h1>
			</Row>
			<Row className="mt-2" noGutters>
				<h6>
					Enter one or multiple keywords below to search for artworks in the Art
					Institute of Chicago.
				</h6>
			</Row>
			<Row noGutters>
				<Form className="w-100 mb-5" onSubmit={onSearchArtworks}>
					<InputGroup>
						<Form.Control
							type="text"
							placeholder="e.g. Monet, O'Keeffe, Ancient Greek..."
							onChange={onChangeKeyword}
							value={keyword}
						/>
						<div className="input-group-prepend">
							<Button
								variant="outline-primary"
								disabled={!keyword}
								type="submit"
							>
								Search accounts
							</Button>
						</div>
					</InputGroup>
				</Form>
			</Row>
			{isLoading && (
				<Row className="justify-content-center mb-5">
					<Spinner animation="border" variant="primary" />
				</Row>
			)}
			{noArtworksFound && !isLoading ? (
				<Alert variant={"info"}>
					No results were found for the entered keyword/s.
				</Alert>
			) : (
				<div>
					{artworks.map((artwork, idx) => {
						const {
							id,
							title,
							image_url,
							artist_display,
							date_display,
							medium_display,
							place_of_origin,
						} = artwork;
						return (
							<Card key={`artwork-${id}`}>
								<a
									href={image_url}
									target="_blank"
									rel="noreferrer"
									aria-current="true"
								>
									<Card.Img variant="top" src={image_url} />
								</a>
								<Card.Body>
									<Card.Title>{title}</Card.Title>
									<Card.Text
										className="text-muted"
										style={{ whiteSpace: "pre-line" }}
									>
										{place_of_origin}, {date_display}
										<br />
										<small className="text-muted">{artist_display}</small>
									</Card.Text>
									<Card.Text>
										<small className="text-muted">{medium_display}</small>
									</Card.Text>
								</Card.Body>
							</Card>
						);
					})}
				</div>
			)}
		</Container>
	)
}

export default Home