import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import * as serviceWorker from "./serviceWorker";

import "./stylesheets/index.scss";
import "bulma/css/bulma.css";
import AppContainer from "./App";
import SignUpContainer from "./SignUp";
import SignInContainer from "./SignIn";
import SignOutContainer from "./SignOut";
import SearchLayout from "./Layout/SearchLayout.jsx";
import MainLayout from "./Layout/MainLayout.jsx";
import HeapLayout from "./Layout/HeapLayout.jsx";
import HeapCreateContainer from "./Heap/HeapCreateContainer.jsx"; // INSPECT NASTY HERE!!
import PreferencesLayout from "./Layout/PreferencesLayout";
import HeapView from "./Heap/HeapView";
import PreferencesContainer from "./Preferences/PreferencesContainer";

const client = new ApolloClient({
  link: createHttpLink({
    uri: document.location.origin + "/graphql",
    credentials: "same-origin"
  }),
  cache: new InMemoryCache()
});

const mainComponent = () => (
  <ApolloProvider client={client}>
    <Router>
      <AppContainer path="/">
        <MainLayout path="/*" />
        <SearchLayout path="search/*" />
      </AppContainer>
      <PreferencesContainer path="/preferences" />
      <HeapLayout path="/heap/*" />
      <HeapCreateContainer path="/createheap" />
      <SignUpContainer path="/signup" />
      <SignInContainer path="/signin" />
      <SignOutContainer path="/signout" />
    </Router>
  </ApolloProvider>
);
ReactDOM.render(mainComponent, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
