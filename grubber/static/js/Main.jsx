import React from 'react';
import NavigationBar from "./NavigationBar";
import PreferencesForm from "./PreferencesForm";
import Cookies from 'js-cookie';
import Form from "./AuthenticationForm";

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: Cookies.get('uuid')
		};
	}
	render() {
		if (this.state.isLoggedIn) {
			return (
				<div>
					<NavigationBar />
					<PreferencesForm />
				</div>
			)
		} else {
			return (
				<div>
					<NavigationBar />
					<Form />
				</div>
			)
		}
		
	}
}