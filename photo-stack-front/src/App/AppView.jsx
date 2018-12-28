import React from 'react';
import PropTypes from 'prop-types';
import {Title} from 'bloomer';
import NavbarContainer from '../Navbar';

export default class AppView extends React.PureComponent {
	render() {
		return (
			<div>
				<NavbarContainer username={this.props.username} isLoading={this.props.isLoading} onSearch={this.props.onSearch}/>
				<Title isSize={4}>Highlights</Title>
				<div style={{width: '90%', backgroundColor: 'gray'}}>Highlight space</div>
				<Title isSize={4}>Heaps</Title>
				<div style={{width: '90%', backgroundColor: 'gray'}}>Heap space</div>
				<Title isSize={4}>All</Title>
				<div style={{width: '90%', backgroundColor: 'gray'}}>All photos space</div>
			</div>
		);
	}
}

AppView.propTypes = {
	username: PropTypes.string.isRequired,
	onSearch: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired
};
