import React from "react";
import Page from "../Page";
import HeapCreate from "./HeapCreate.jsx";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { navigate } from "@reach/router";

const CREATE_HEAP = gql`
  mutation Create($name: String!, $tags: [String]!) {
    createHeap(name: $name, tags: $tags) {
      id
    }
  }
`;

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
    const { confirmStatus } = this.state;
    return (
      <Page title="Create new Heap">
        <Mutation mutation={CREATE_HEAP}>
          {(performMutation, { data, error }) => {
            if (data) {
              navigate("/heap/" + data.createHeap.id);
            }
            return <HeapCreate onHeapCreate={performMutation} />;
          }}
        </Mutation>
      </Page>
    );
  }
}
