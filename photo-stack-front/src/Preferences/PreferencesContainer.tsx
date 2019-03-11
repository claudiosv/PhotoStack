import React from "react";
import Preferences from "./Preferences.jsx";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Page from "../Page";

const GET_USER = gql`
  query getUser {
    getUser {
      firstName
      lastName
      email
    }
  }
`;

const UPDATE_USER = gql`
mutation Update($firstName: String!, $lastName: String!, $email: String!, $password: String!){
  updateUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password){
    id
  }
}
`;

export default class PreferencesContainer extends React.Component {
  render() {
    return (
      <Page title="Preferences">
        <Query query={GET_USER}>
          {({ loading, error, data }) => {
            if (loading) {
              return "Loading...";
            }
            if (data) {
              return (
                <Mutation mutation={UPDATE_USER}>
                  {performMutauion => {
                    return (
                      <Preferences
                        initialData={data.getUser}
                        onSave={performMutauion}
                      />
                    );
                  }}
                </Mutation>
              );
            }
          }}
        </Query>
      </Page>
    );
  }
}
