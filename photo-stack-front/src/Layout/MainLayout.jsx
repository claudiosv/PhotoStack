import React from 'react';
import {Container, Section, Title} from 'bloomer';
import MosaicContainer from '../Mosaic';
import HighlightContainer from '../Highlight';
import HeapContainer from '../Heap';

export default class MainLayout extends React.Component {
	render() {
		return (
			<Section>
				<Container>
					<Container>
						<Title isSize={4}>Highlights</Title>
						{/* <HighlightContainer/> */}
					</Container>
					<Container>
						<Title isSize={4}>Heaps</Title>
						<HeapContainer/>
					</Container>
				</Container>
				<Container>
					<MosaicContainer query=""/>
				</Container>
			</Section>
		);
	}
}
