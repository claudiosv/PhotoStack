import React from 'react';
// import {Redirect} from 'react-router-dom';
import Session from '../Session';
import SignOut from './SignOut.jsx';

export default class SignOutContainer extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		signOutStatus: false
	// 	};
	// }

	// componentDidMount() {
	// 	// Tell the server to close the session
	// 	// On success
	// 	this.setState({signOutStatus: true});
	// }

	render() {
		// const {signOutStatus} = this.state;
		return (
			<Session>
				<>
					<SignOut/>
					{/* {signOutStatus ? <Redirect to="/"/> : null} */}
				</>
			</Session>
		);
	}
}
