import React from 'react';
import { Grid, Form, FormGroup, Checkbox, FormControl, ControlLabel, Button, Col, Row } from 'react-bootstrap';

export default class PreferencesForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cuisines: ["American", "Chinese", "Japanese", "Korean", "Italian", "Mexican", "Greek", "Mediterranean", "Thai", "Peruvian", "Vietnamese", "Malaysian", "Flipino", "French", "Indian"],
			prices: ["$", "$$", "$$$", "$$$$"]
		};
	}
	
	render() {
		return (
			<Grid bsClass="container">
				<Form>
					<FormGroup>
						<ControlLabel>
							Cuisine Preference
						</ControlLabel>
						<Row className="show-grid">
						{this.state.cuisines.map(cuisine => 
						<Col xs={6} md={4}>
							<Checkbox key={cuisine.toLowerCase()}> 
								{cuisine} 
							</Checkbox>
						</Col>)
						}
						</Row>
					</FormGroup>
					<FormGroup>
						<ControlLabel>
							Price <br/>
						</ControlLabel>
						{this.state.prices.map((price, index) =>
							<Checkbox inline key={index + 1}> {price} </Checkbox>
						)}
					</FormGroup>
					<FormGroup>
							<FormControl type="text" placeholder="Brooklyn, NY" />
					</FormGroup>
				</Form>
				<Button bsStyle="primary">Find</Button>
			</Grid>
		)
	}
}