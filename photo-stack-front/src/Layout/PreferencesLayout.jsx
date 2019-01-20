import React from 'react';
import {Container} from 'bloomer';
import MosaicContainer from '../Mosaic';
import Page from '../Page';
import PreferencesContainer from '../Preferences/PreferencesContainer';

export default class PreferencesLayout extends React.Component {
	render() {
		return (
		<Page title="Create new Heap">
			<PreferencesContainer/>
		</Page>);
	}
}
