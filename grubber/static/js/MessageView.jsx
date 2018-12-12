import React from 'react';
import Cookies from 'js-cookie';
import NavigationBar from "./NavigationBar";
import { Redirect, withRouter } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col, timeoutsShape } from 'reactstrap';

class MessageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: this.props.location.state.userId,
      recipient: this.props.location.state.recipient,
      recipientEmail: this.props.location.state.recipientEmail,
      messages: [],
      messageToSend: ""
    };
    this.refresh = this.refresh.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  async refresh() {
    var endpoint = "/api/getMessage/user=" + this.state.uuid + "&recipient=" + this.state.recipient;
    console.log(endpoint);
    const response = await fetch(endpoint);
    const json = await response.json();
    this.setState({ messages: json });
  }

   async componentDidMount() {
    this.refresh();
  }

  handleSubmit(event) {
    var data = {
      uuid: this.state.uuid,
      friend_id: this.state.recipient,
      message: this.state.messageToSend,
      placeholder: 'Enter a message...'
    };

    event.preventDefault();
    fetch('/api/sendMessage', {
      method: 'post',
      headers: {'Content-Type':'application/json', 'Accept': 'application/json'},
      body: JSON.stringify(data)
    }).then(response => {
      response.text().then(res => {
        this.refresh();
        this.state.placeholder = "";
      })
    });
  }

  handleMessageChange(event) {
    var message = event.target.value;
    this.state.messageToSend = message;
  }

  render() {
    let counter = 0;
    return (
      <div>
        <NavigationBar/>
        <Container style={{ padding: 20 }}>
          {this.state.messages.map((message) => (
            <div key={counter}>
              <strong>{message.senderEmail}</strong> - {message.message}
            </div>
          ))}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Input type="text" id="messageField" onChange={this.handleMessageChange} name="message" placeholder={this.state.placeholder} required />
              <Button color="primary">Send</Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(MessageView);