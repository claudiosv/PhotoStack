import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import * as serviceWorker from './serviceWorker';

import './stylesheets/index.scss';
import 'bulma/css/bulma.css';
import AppRouter from './App/AppRouter.jsx';

const client = new ApolloClient({
	uri: 'localhost'
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<BrowserRouter>
			<AppRouter/>
		</BrowserRouter>
	</ApolloProvider>,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
