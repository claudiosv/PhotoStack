import React from 'react';
import {Redirect} from 'react-router-dom';
import Page from '../Page';
import HeapCreate from './HeapCreate.jsx';

export default class HeapCreateContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			confirmStatus: false
		};
		this.onHeapCreate = this.onHeapCreate.bind(this);
	}

	onHeapCreate(values) {
		// On success
		this.setState({
			confirmStatus: true
		});
	}

	render() {
		const {confirmStatus} = this.state;
		const {history} = this.props;
		return (
			<Page title="Create new Heap">
				<HeapCreate onHeapCreate={this.onHeapCreate}/>
				{confirmStatus ? <Redirect to="/"/> : null}
			</Page>
		);
	}
}
