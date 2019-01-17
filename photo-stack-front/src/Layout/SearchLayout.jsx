import React from 'react';
import {Container} from 'bloomer';
import MosaicContainer from '../Mosaic';

export default class SearchLayout extends React.Component {
	render() {
		return (
			<Container>
				<MosaicContainer query={this.props.query}/>
			</Container>
		);
	}
}
