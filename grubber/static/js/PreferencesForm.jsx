import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';

export default class PreferencesForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cuisines: ["American", "Chinese", "Japanese", "Korean", "Italian", "Mexican", "Greek", "Mediterranean", "Thai", "Peruvian", "Vietnamese", "Malaysian", "Flipino", "French", "Indian"],
			prices: ["$", "$$", "$$$", "$$$$"],
			distances: [1, 2, 5, 10]
		};
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log("hello world");
	}

	render() {
		return (
			<Container>
				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<Label>
							<strong>Cuisine Preference</strong>
						</Label>
						<Row className="show-grid">
						{this.state.cuisines.map(cuisine => 
						<Col xs={6} md={4} key={cuisine}>
							<Label check>
								<Input type="checkbox" key={cuisine.toLowerCase()} /> 
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
									<Input type="checkbox" key={index + 1} /> {price}
								</Label>
							</Col>
						)}
					</FormGroup>
					<FormGroup>
						<Input type="text" placeholder="Address, neighborhood, state or zip" />
					</FormGroup>
					<FormGroup>
						<Label for="exampleSelectMulti"><strong>Distance</strong></Label>
							<Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
							{this.state.distances.map(distance =>
								<option key={distance} value={distance}>{distance + (distance > 1 ? " miles" : " 	mile")} </option>
							)}
							</Input>
					</FormGroup>
				</Form>
				<Button type="submit">Find</Button>
			</Container>
		)
	}
}