import React from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button} from 'reactstrap';
import { Redirect, withRouter } from 'react-router-dom';

export default class AuthenticationForm extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
	    return (
	      <Container className="App">
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
	          <i><a href="#">Don't have an account?</a></i>
	        </Form>
	      </Container>
	    )
  }
}