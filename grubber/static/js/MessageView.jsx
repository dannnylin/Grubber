import React from 'react';
import Cookies from 'js-cookie';
import NavigationBar from "./NavigationBar";
import { Redirect, withRouter } from 'react-router-dom';

class MessageView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavigationBar />
        MessageView
			</div>
    );
  }
}

export default withRouter(MessageView);