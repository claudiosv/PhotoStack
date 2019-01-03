import React from 'react';
import {Title} from 'bloomer';
import Gallery from 'react-photo-gallery';
import PropTypes from 'prop-types';

export default class Mosaic extends React.PureComponent {
	render() {
		const {title, photoSet} = this.props;
		return (
		<>
			<Title isSize={4}>{title}</Title>
			<Gallery photos={photoSet}/>
		</>
		);
	}
}

Mosaic.propTypes = {
	title: PropTypes.string.isRequired,
	photoSet: PropTypes.array.isRequired
};
