import React from 'react';
import NavigationBar from "./NavigationBar";
import PreferencesForm from "./PreferencesForm";
import Cookies from 'js-cookie';
import Login from "./LoginForm";

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: Cookies.get('uuid')
		};
	}
	render() {
		if (this.state.isLoggedIn) {
			fetch('/api/getPreferences', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ uuid: Cookies.get('uuid') })
			}).then(response => {
				response.json().then(data => {
					if (data) {
						console.log("have preferences set");
					} else {
						console.log("no preferences set");
					}
				});
			});	
			return (
				<div>
					<NavigationBar />
					<PreferencesForm />
				</div>
			)
		} else {
			return (
				<div>
					<Login />
				</div>
			)
		}
	}
}