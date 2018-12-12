import React from 'react';
import Cookies from 'js-cookie';
import NavigationBar from "./NavigationBar";
import { Redirect, withRouter } from 'react-router-dom';
import { Row, Container } from 'reactstrap';

class MessagesListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      redirect: false,
      lookup: {}
    }
  }

  componentWillMount() {
    var uuid = {
      uuid: Cookies.get('uuid')
    };
    fetch('/api/getMessages', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(uuid)
    }).then(response => {
      response.json().then(data => {
        var phonebook = {};
        for (var key in data) {
          phonebook[key] = data[key][0]["recipientEmail"];
        }
        this.setState( {
          messages: data,
          lookup: phonebook
        });
      });
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

  handleMessageClick(event) {
   var recipient = event._dispatchInstances.memoizedProps.data;
   var recipientEmail = event._dispatchInstances.memoizedProps.email;
    this.setState({
      redirect: true,
      recipient: recipient,
      recipientEmail: recipientEmail
    });
  }

  render() {
    let rowStyle = {
      backgroundColor: "#93E1D8",
      padding: "20",
      marginBottom: "10"
    };
    return (
      <div>
      {this.renderRedirect()}
        <NavigationBar />
        <Container style={{ padding: 20 }}>
          {Object.keys(this.state.messages).map((thread) => (
            <Row style={rowStyle} data={thread} email={this.state.lookup[thread]} onClick={this.handleMessageClick.bind(this)}>
              {([this.state.messages[thread][0]]).map((message) => (
                <div>
                  <strong>{message.recipientEmail}</strong> - {message.message}
                </div>
              ))}
            </Row>
          ))}
        </Container>
			</div>
    );
  }
}

export default withRouter(MessagesListView);