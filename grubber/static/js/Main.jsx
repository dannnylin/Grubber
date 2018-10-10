import React from 'react';
import NavigationBar from "./NavigationBar";
import PreferencesForm from "./PreferencesForm";

export default class Main extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<NavigationBar />
				<PreferencesForm />
			</div>
		)
	}
}