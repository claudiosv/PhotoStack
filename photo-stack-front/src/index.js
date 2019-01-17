import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from '@reach/router';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import * as serviceWorker from './serviceWorker';

import './stylesheets/index.scss';
import 'bulma/css/bulma.css';
import AppContainer from './App';
import SignUpContainer from './SignUp';
import SignInContainer from './SignIn';
import SignOutContainer from './SignOut';
import SearchLayout from './Layout/SearchLayout.jsx';
import MainLayout from './Layout/MainLayout.jsx';
import PhotoLayout from './Layout/PhotoLayout.jsx';
import PreferencesLayout from './Layout/PreferencesLayout.jsx';
import HeapLayout from './Layout/HeapLayout.jsx';
import HeapCreateContainer from './Heap/HeapCreateContainer.jsx'; // INSPECT NASTY HERE!!

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql'
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<Router>
			<AppContainer path="/">
				<MainLayout path="/"/>
				<SearchLayout path="search/:query"/>
				<PhotoLayout path="photo/:photoId"/>
				<PreferencesLayout path="preferences/:userId"/>
				<HeapLayout path="heap/:heapId"/>
				<HeapCreateContainer path="createheap"/>
			</AppContainer>
			<SignUpContainer path="/signup"/>
			<SignInContainer path="/signin"/>
			<SignOutContainer path="/signout"/>
		</Router>
	</ApolloProvider>,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
