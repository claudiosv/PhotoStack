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
			<App userId={user.id} showSearchResults={showSearchResults} searchTerms={searchTerms} searchPhotoSet={photos}/>
		</>
		);
	}
}

const photos = [
	{
		src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
		width: 4,
		height: 3
	},
	{
		src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799',
		width: 1,
		height: 1
	},
	{
		src: 'https://source.unsplash.com/qDkso9nvCg0/600x799',
		width: 3,
		height: 4
	},
	{
		src: 'https://source.unsplash.com/iecJiKe_RNg/600x799',
		width: 3,
		height: 4
	},
	{
		src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799',
		width: 3,
		height: 4
	},
	{
		src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599',
		width: 4,
		height: 3
	},
	{
		src: 'https://source.unsplash.com/zh7GEuORbUw/600x799',
		width: 3,
		height: 4
	},
	{
		src: 'https://source.unsplash.com/PpOHJezOalU/800x599',
		width: 4,
		height: 3
	},
	{
		src: 'https://source.unsplash.com/I1ASdgphUH4/800x599',
		width: 4,
		height: 3
	}
];
