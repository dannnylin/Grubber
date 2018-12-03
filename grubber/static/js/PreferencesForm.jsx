import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col, timeoutsShape } from 'reactstrap';
import { Redirect, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

class PreferencesForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cuisines: {
				"American": false, 
				"Chinese": false, 
				"Japanese": false, 
				"Korean": false, 
				"Italian": false, 
				"Mexican": false, 
				"Greek": false, 
				"Mediterranean": false,
				 "Thai": false, 
				 "Peruvian": false, 
				 "Vietnamese": false, 
				 "Malaysian": false, 
				 "Flipino": false, 
				 "French": false, 
				 "Indian": false
			},
			prices: {
				1: false, 
				2: false, 
				3: false,
				4: false
			},
			distances: {
				1: false,
				2: false,
				5: false,
				10: false
			},
			address: "",
			uuid: Cookies.get('uuid'),
			redirect: false
		};

		this.handleCuisineChange = this.handleCuisineChange.bind(this);
		this.handlePriceChange = this.handlePriceChange.bind(this);
		this.handleDistanceChange = this.handleDistanceChange.bind(this);
		this.handleAddressChange = this.handleAddressChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleCuisineChange(event) {
		var cuisine = event.target.name;
		this.state.cuisines[cuisine] = !this.state.cuisines[cuisine];
	}

	handlePriceChange(event) {
		var price = event.target.name;
		this.state.prices[price] = !this.state.prices[price];
	}

	handleDistanceChange(event) {
		var distance = event.target.value;
		this.state.distances[distance] = !this.state.distances[distance];
	}

	handleAddressChange(event) {
		var address = event.target.value;
		this.state.address = address;
	}

	handleSubmit(event) {
		event.preventDefault();
		let data = this.state;
		data["uuid"] = Cookies.get("uuid");
		fetch('/api/setPreferences', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(this.state)
		}).then(response => {
			response.json().then(data => {
				this.setState({
					redirect: true,
					response: data
				});
			})
		});
		fetch('/api/restaurants', {
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify(this.state)
		}).then(response => {
			response.json().then(data => {
				this.setState({
					redirect: true,
					response: data
				});
			})
		});
	}

	renderRedirect() {
		if (this.state.redirect) {
			this.props.history.push({
				pathname: '/restaurantsView',
				state: { restaurants: this.state.response }
			});
		}
	}

	render() {
		return (
			<Container style={{padding: 20}}>
				{ this.renderRedirect() }
				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<Label>
							<strong>Cuisine Preference</strong>
						</Label>
						<Row className="show-grid">
						{Object.keys(this.state.cuisines).map((cuisine, i) => 
						<Col xs={6} md={4} key={cuisine}>
							<Label check>
								<Input type="checkbox" name={cuisine} onChange={this.handleCuisineChange} key={cuisine.toLowerCase()} value={this.state.cuisines[cuisine]} /> 
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
						{Object.keys(this.state.prices).map((price, index) =>
							<Col xs={6} md={4} key={price}>
								<Label check>
									<Input type="checkbox" name={price} onChange={this.handlePriceChange} key={index + 1} value={this.state.prices[price]}/> {"$".repeat(price)}
								</Label>
							</Col>
						)}
					</FormGroup>
					<FormGroup>
						<Input type="text" name="address" onChange={this.handleAddressChange} placeholder="Address, neighborhood, state or zip" required />
					</FormGroup>
					<FormGroup>
						<Label><strong>Distance</strong></Label><br/>
						<select name="distance" onChange={this.handleDistanceChange} id="distance" multiple required>
							{Object.keys(this.state.distances).map((distance, index) =>
								<option key={distance} name={distance} value={distance}>{distance + (distance > 1 ? " miles" : " 	mile")} </option>
							)}
							</select>
					</FormGroup>
					<Button>Find</Button>
				</Form>
			</Container>
		)
	}
}
export default withRouter(PreferencesForm);