import React from 'react';
import PropTypes from 'prop-types';
import {Container, Section, Title} from 'bloomer';
import HighlightContainer from '../Highlight';
import HeapContainer from '../Heap';
import '../stylesheets/app.scss';
import MosaicContainer from '../Mosaic';

export default class App extends React.PureComponent {
	render() {
		const {showSearchResults, searchTerms} = this.props;

		return (
			<Section>
				<Container id="top" className={(showSearchResults ? 'fadeOut' : 'fadeIn')}>
					<Container>
						<Title isSize={4}>Highlights</Title>
						<HighlightContainer/>
					</Container>
					<Container>
						<Title isSize={4}>Heaps</Title>
						<HeapContainer/>
					</Container>
				</Container>
				<Container id="mosaic" className={(showSearchResults ? 'slideOut' : 'slideIn')}>
					<MosaicContainer searchTerms={searchTerms}/>
				</Container>
			</Section>
		);
	}
}

App.propTypes = {
	showSearchResults: PropTypes.bool.isRequired,
	searchTerms: PropTypes.string.isRequired
};
