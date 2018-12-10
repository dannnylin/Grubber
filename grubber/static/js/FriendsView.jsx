import React from 'react';
import Cookies from 'js-cookie';
import NavigationBar from "./NavigationBar";
import { Redirect, withRouter } from 'react-router-dom';

class FriendsView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<NavigationBar />
				Hello world!
			</div>
		);
	}
}

export default withRouter(FriendsView);