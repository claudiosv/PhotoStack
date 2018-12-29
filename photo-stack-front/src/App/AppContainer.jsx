import React from 'react';
import Header from '../Header';
import App from './App.jsx';

export default class AppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				id: '0',
				firstName: 'username'
			},
			isBusy: false,
			showSearchResults: false
		};
		this.search = this.search.bind(this);
		this.toggleBusy = this.toggleBusy.bind(this);
	}

	componentDidMount() {
		// Fetch user {id: '', firstName: ''}
	}

	toggleBusy() {
		this.setState(state => ({
			isBusy: !state.isBusy
		}));
	}

	search(input) {
		this.toggleBusy();
		console.log(input);
	}

	render() {
		const {user, isBusy, showSearchResults} = this.state;
		return (
		<>
			<Header type="search" userName={user.firstName} isBusy={isBusy} onSearch={this.search}/>
			<App userId={user.id} showSearchResults={showSearchResults}/>
		</>
		);
	}
}
