import React from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button} from 'reactstrap';
import { Redirect, withRouter } from 'react-router-dom';
import NavigationBar from "./NavigationBar";

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false
		}
		this.handleClick = this.handleClick.bind(this);
	}

	renderRedirect() {
		if (this.state.redirect) {
			this.props.history.push({
				pathname: '/register'
			});
		}
	}

	handleClick(event) {
		this.setState({
			redirect: true
		});
	}

	render() {
	    return (
				<div>
					<NavigationBar />
					<Container className="App">
						{this.renderRedirect()}
						<h2>Login</h2>
						<Form className="form" method="POST" action="/api/login">
							<Col>
								<FormGroup>
									<Label>Email</Label>
									<Input
										type="email"
										name="email"
										id="exampleEmail"
										placeholder="myemail@email.com"
									/>
								</FormGroup>
							</Col>
							<Col>
								<FormGroup>
									<Label for="examplePassword">Password</Label>
									<Input
										type="password"
										name="password"
										id="examplePassword"
										placeholder="********"
									/>
								</FormGroup>
							</Col>
							<Button>Login</Button>
							<br />
							<i><a onClick={this.handleClick}>Don't have an account?</a></i>
						</Form>
					</Container>
				</div>
	    )
  }
}

export default withRouter(LoginForm);