import React from 'react';
import Header from '../Header';
import App from './App.jsx';

export default class AppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				id: '0',
				firstName: 'Username'
			},
			isBusy: false,
			showSearchResults: false,
			searchTerms: ''
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
		if (input === '') {
			this.setState({
				showSearchResults: false,
				searchTerms: ''
			});
		} else {
			this.setState({
				showSearchResults: true,
				searchTerms: input
			});
			this.toggleBusy();
		}
	}

	render() {
		const {user, isBusy, showSearchResults, searchTerms} = this.state;
		return (
			<>
				<Header type="search" userName={user.firstName} isBusy={isBusy} onSearch={this.search}/>
				<App
					showSearchResults={showSearchResults}
					searchTerms={searchTerms}
				/>
			</>
		);
	}
}
