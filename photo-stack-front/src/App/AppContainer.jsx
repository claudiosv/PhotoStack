import React from 'react';
import AppView from './AppView.jsx';

export default class AppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		};
		this.search = this.search.bind(this);
	}

	componentDidMount() {
		// Get data => if FAIL is received from the server go to Login
	}

	search(input) {
		console.log(input);
	}

	render() {
		return (
			<AppView username="Username" isLoading={this.state.loading} onSearch={this.search}/>
		);
	}
}
