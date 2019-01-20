import React from "react";
import { Columns, Column } from "bloomer";
import { Link } from "@reach/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import plus from "../plus-solid.png";
import Heap from "./Heap.jsx";

const GET_HEAPS = gql`
  {
    getHeaps {
      id
	  name
	  tags
    }
  }
`;

const GET_HEAP_PHOTOS = gql`
  query GetHeapPhotos($query: [String!]!) {
    searchPhotos(query: $query) {
      objectId
    }
  }
`;

export default class HeapContainer extends React.Component {
  render() {
    return (
      <Columns isMultiline isGrid>
        <Query query={GET_HEAPS}>
          {({ loading, error, data }) => {
            if (loading) {
              return "Loading...";
            }
            if (error) {
              console.log(error);
              return null;
            }
            return data.getHeaps.map(heap => {
				console.log(heap.tags);
              return (
                <Query query={GET_HEAP_PHOTOS} variables={{query: heap.tags}}>
                  {({ loading, data, error }) => {
					  if (loading) {
						  return 'loading...';
					  }
                    if (data) {
						const {searchPhotos} = data;
						console.log(data);
                      return (
                        <Column key={heap.id} isSize="1/4">
                          <Heap
                            id={heap.id}
                            thumbnail={searchPhotos[0].objectId}
                            name={heap.name}
                          />
                        </Column>
                      );
                    }
                  }}
                </Query>
              );
            });
          }}
        </Query>
        <Column isSize="1/4">
          <Link to="createheap">
            <Heap noLink thumbnail={plus} name="Create new..." />
          </Link>
        </Column>
      </Columns>
    );
  }
}
