import React from 'react';
import PropTypes from 'prop-types';
import {Container, Section, Title} from 'bloomer';
import HighlightContainer from '../Highlight';
import HeapContainer from '../Heap';
import Mosaic from '../Mosaic';
import '../stylesheets/app.scss';

export default class App extends React.PureComponent {
	render() {
		const {userId, showSearchResults, searchTerms, searchPhotoSet} = this.props;
		const title = (searchTerms === '') ? 'All' : 'Looking for "' + searchTerms + '"';
		console.log(title);
		console.log(showSearchResults);
		return (
			<Section>
				<Section id="top" className={(showSearchResults ? 'fadeOut' : 'fadeIn')}>
					<Container>
						<Title isSize={4}>Highlights</Title>
						<HighlightContainer userId={userId}/>
					</Container>
					<Container>
						<Title isSize={4}>Heaps</Title>
						<HeapContainer userId={userId}/>
					</Container>
				</Section>
				<Container id="mosaic" className={(showSearchResults ? 'slideOut' : 'slideIn')}>
					<Mosaic title={title} photoSet={searchPhotoSet}/>
				</Container>
			</Section>
		);
	}
}

App.propTypes = {
	userId: PropTypes.string.isRequired,
	showSearchResults: PropTypes.bool.isRequired,
	searchTerms: PropTypes.string.isRequired,
	searchPhotoSet: PropTypes.array.isRequired
};
