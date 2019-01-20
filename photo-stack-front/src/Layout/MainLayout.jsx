import React from 'react';
import {Container, Section, Title} from 'bloomer';
import MosaicContainer from '../Mosaic';
import HighlightContainer from '../Highlight';
import HeapContainer from '../Heap';
import { Router, navigate } from '@reach/router';
import PhotoContainer from '../Photo';

export default class MainLayout extends React.Component {
	render() {
		return (
			<Section>
				<Container>
					<Container>
						<Title isSize={4}>Recent</Title>
						<HighlightContainer/>
					</Container>
					<Container>
						<Title isSize={4}>Heaps</Title>
						<HeapContainer/>
					</Container>
				</Container>
				<Container>
					<MosaicContainer query=""/>
				</Container>
				<Router>
					<PhotoContainer isOpen path="photo/:photoId" onClose={() => window.history.back()}/>
				</Router>
			</Section>
		);
	}
}
