import React from 'react';
import Cookies from 'js-cookie';
import NavigationBar from "./NavigationBar";
import { Redirect, withRouter } from 'react-router-dom';
import { Row, Container } from 'reactstrap';

class MessagesListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
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
        this.setState( {
          messages: data
        });
      });
    });
  }

  handleMessageClick(event) {
    console.log(event._dispatchInstances.memoizedProps.data);
  }

  render() {
    let rowStyle = {
      backgroundColor: "#93E1D8",
      padding: "20",
      marginBottom: "10"
    };
    return (
      <div>
        <NavigationBar />
        <Container style={{ padding: 20 }}>
          {Object.keys(this.state.messages).map((thread) => (
            <Row style={rowStyle} data={thread} onClick={this.handleMessageClick.bind(this)}>
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