import React from 'react';
import PropTypes from 'prop-types';

export default class HighlightContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		// Load highlight photos
	}

	render() {
		return (
			<div style={{backgroundColor: 'gray'}}>HighlightContainer</div>
		);
	}
}

HighlightContainer.propTypes = {
	userId: PropTypes.string.isRequired
};
