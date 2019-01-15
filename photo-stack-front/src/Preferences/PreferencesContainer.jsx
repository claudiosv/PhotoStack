import React from 'react';
import Preferences from './Preferences.jsx';

export default class PreferencesContainer extends React.Component { 

	constructor(props) {
		super(props);
		this.state = {
			isOpen: true
		};
		this.handleClose = this.handleClose.bind(this);
	}

	// componentDidMount(){
	// 	this.setState({
	// 		isOpen: true
	// 	});
	// }

	handleClose() {
		const {history} = this.props;
		this.setState({
			isOpen: false
		});
		history.goBack();
	}

	render() {
		const {isOpen} = this.state;
		return (
			<Preferences isOpen={isOpen} onClose={this.handleClose}/>
		);
	}
}