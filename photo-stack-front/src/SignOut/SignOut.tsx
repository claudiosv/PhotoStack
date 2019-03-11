import React from 'react';
import {Title} from 'bloomer';

export default class SignOut extends React.PureComponent {
	render() {
		return (
			<>
				<Title isSize={1}>Sign out</Title>
				<Title isSize={4}>Hold on!</Title>
				<Title isSize={4}>We&#39;re closing your session...</Title>
			</>
		);
	}
}
