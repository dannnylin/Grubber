import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col, timeoutsShape } from 'reactstrap';

export default class PreferencesForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cuisines: ["American", "Chinese", "Japanese", "Korean", "Italian", "Mexican", "Greek", "Mediterranean", "Thai", "Peruvian", "Vietnamese", "Malaysian", "Flipino", "French", "Indian"],
			prices: ["$", "$$", "$$$", "$$$$"],
			distances: [1, 2, 5, 10]
		};
	}

	render() {
		return (
			<Container style={{padding: 20}}>
				<Form action="/restaurants" method="POST">
					<FormGroup>
						<Label>
							<strong>Cuisine Preference</strong>
						</Label>
						<Row className="show-grid">
						{this.state.cuisines.map(cuisine => 
						<Col xs={6} md={4} key={cuisine}>
							<Label check>
								<Input type="checkbox" name="cuisines[]" key={cuisine.toLowerCase()} value={cuisine} /> 
									{cuisine}
							</Label>
						</Col>)
						}
						</Row>
					</FormGroup>
					<FormGroup>
						<Label>
							<strong>Price</strong>
						</Label>
						{this.state.prices.map((price, index) =>
							<Col xs={6} md={4} key={price}>
								<Label check>
									<Input type="checkbox" name="price[]" key={index + 1} value={index + 1}/> {price}
								</Label>
							</Col>
						)}
					</FormGroup>
					<FormGroup>
						<Input type="text" name="address" placeholder="Address, neighborhood, state or zip" />
					</FormGroup>
					<FormGroup>
						<Label><strong>Distance</strong></Label>
							<Input type="select" name="distance" id="distance" multiple>
							{this.state.distances.map(distance =>
								<option key={distance} value={distance}>{distance + (distance > 1 ? " miles" : " 	mile")} </option>
							)}
							</Input>
					</FormGroup>
					<Button>Find</Button>
				</Form>
			</Container>
		)
	}
}