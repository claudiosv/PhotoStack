import React from 'react';
import FileDrop from 'react-file-drop';
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
			showSearchResults: false,
			searchTerms: ''
		};
		this.handleSearch = this.handleSearch.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
	}

	componentDidMount() {
		// Fetch user {id: '', firstName: ''}
	}

	handleSearch(input) {
		if (input.length === 0) {
			this.setState({
				showSearchResults: false,
				searchTerms: ''
			});
		} else {
			this.setState({
				showSearchResults: true,
				searchTerms: input.map(e => e.label).join(' ')
			});
		}
	}

	handleDrop(files) {
		console.log(files);
	}

	render() {
		const {user, showSearchResults, searchTerms} = this.state;
		return (
			<FileDrop onDrop={this.handleDrop}>
				<Header type="search" userName={user.firstName} onSearch={this.handleSearch}/>
				<App
					showSearchResults={showSearchResults}
					searchTerms={searchTerms}
				/>
			</FileDrop>
		);
	}
}
