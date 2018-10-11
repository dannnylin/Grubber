import React from 'react';
import NavigationBar from "./NavigationBar";
import PreferencesForm from "./PreferencesForm";
import TinderView from './TinderView';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<NavigationBar />
				<PreferencesForm />
				<TinderView />
			</div>
		)
	}
}