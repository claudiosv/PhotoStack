import React from 'react';
import PropTypes from 'prop-types';
import {Container, Section, Title} from 'bloomer';
import HighlightContainer from '../Highlight';
import HeapContainer from '../Heap';
import '../stylesheets/app.scss';

export default class App extends React.PureComponent {
	render() {
		const {userId, showSearchResults} = this.props;
		return (
			<Section>
				<Container>
					<Title isSize={4}>Highlights</Title>
					<HighlightContainer/>
				</Container>
				<Container>
					<Title isSize={4}>Heaps</Title>
					<HeapContainer/>
				</Container>
				<Container>
					<Title isSize={4}>All</Title>
					<div style={{backgroundColor: 'gray'}}>All photos space</div>
				</Container>
			</Section>
		);
	}
}

App.propTypes = {
	userId: PropTypes.string.isRequired,
	showSearchResults: PropTypes.bool.isRequired
};
