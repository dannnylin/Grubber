import React from 'react';
import Cookies from 'js-cookie';
import NavigationBar from "./NavigationBar";
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col, timeoutsShape } from 'reactstrap';
import { Redirect, withRouter } from 'react-router-dom';

class FriendsView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [],
			friends: [],
			redirect: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.addFriend = this.addFriend.bind(this);
		this.handleMessageClicked = this.handleMessageClicked.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		var data = {
			email: this.state.friendEmail
		};
		fetch('/api/searchFriend', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		}).then(response => {
			response.json().then(data => {
				this.setState({
					searchResults: data
				});
			})
		});
	}

	componentWillMount() {
		var data = {
			uuid: Cookies.get('uuid')
		};
		fetch('/api/getFriends', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		}).then(response => {
			response.json().then(data => {
				this.setState({
					friends: data
				});
			})
		});
	}

	handleEmailChange(event) {
		var email = event.target.value;
		this.setState({
			friendEmail: email
		});
	}

	addFriend(event) {
		event.preventDefault();
		var data = {
			uuid: Cookies.get('uuid'),
			friend: this.state.friendEmail
		};
		console.log(data);
		fetch('/api/addFriend', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		}).then(response => {
			response.json().then(data => {
				console.log(data);
			})
		});
	}

	renderRedirect() {
	    if (this.state.redirect) {
	      console.log(this.state.recipient);
	      this.props.history.push({
	        pathname: '/message/' + this.state.recipient,
	        state: { "userId": Cookies.get('uuid'), "recipient": this.state.recipient, "recipientEmail": this.state.recipientEmail }
	      });
	    }
	}

	handleMessageClicked(event) {
		event.preventDefault();
		this.setState({
			recipient: event._dispatchInstances.memoizedProps.data,
			recipientEmail: event._dispatchInstances.memoizedProps.email,
			redirect: true
		});
	}

	render() {
		return (
			<div>
				{this.renderRedirect()}
				<NavigationBar />
				<Container style={{ padding: 20 }}>
				<table>
					<tr>
						<td>
							<Form onSubmit={this.handleSubmit}>
								<FormGroup>
									<Label><strong>Search for friends</strong></Label>
									<Input type="email" name="email" onChange={this.handleEmailChange} placeholder="Friend's email address" required />
									<Button color="primary">Search</Button>
								</FormGroup>
							</Form>
							{this.state.searchResults.map((friend) => (
								<div key={friend.email}>
									{friend.email}
									<Form onSubmit={this.addFriend} key={friend.email}>
									<FormGroup>
										<Button color="primary">Add Friend</Button>
									</FormGroup>
									</Form>
								</div>
							))}
						</td>
					</tr>
					<tr>
						<td>
							<strong>Your Friends</strong>
								{this.state.friends.map((friend) => (
									<div>
										{friend.email}
										<Form key={friend.email} >
											<FormGroup>
												<Button data={friend._id["$oid"]} email={friend.email} color="primary" onClick={this.handleMessageClicked}>Message</Button>
											</FormGroup>
										</Form>
									</div>
								))}
						</td>
					</tr>
					</table>
				</Container>
			</div>
		);
	}
}

export default withRouter(FriendsView);