import React from 'react';

export default class HeapContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		// Load heap groups
	}

	render() {
		return (
			<div style={{backgroundColor: 'gray'}}>HeapContainer</div>
		);
	}
}
