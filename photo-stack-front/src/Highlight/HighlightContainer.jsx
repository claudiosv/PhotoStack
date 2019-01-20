import React from "react";
import PropTypes from "prop-types";
import { Box, Image, Tile } from "bloomer";

import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_HIGHLIGHTS = gql`
  {
    getHighlights {
      thumbnail
    }
  }
`;

export default class HighlightContainer extends React.Component {
  render() {
    return (
      <Query query={GET_HIGHLIGHTS}>
        {({ loading, error, data }) => {
          if (loading) {
            return "Loading...";
          }
          if (error) {
            console.log(error);
            return null;
          }
          const highlightIds = data.getHighlights;
          console.log(highlightIds.length);
          if (highlightIds.length <= 4) {
            return (
              <article class="message is-info">
                <div class="message-body">
                  You need to upload at least 5 photos to get this feature
                </div>
              </article>
            );
          } else {
            return (
              <Tile isAncestor>
                <Tile isParent isSize={6}>
                  <Tile
                    isChild
                    url={
                      "http://localhost:3000/image/" + highlightIds[0].thumbnail
                    }
                    render={props => (
                      <Box>
                        <Image src={props.url} />
                      </Box>
                    )}
                  />
                </Tile>
                <Tile isParent isVertical>
                  <Tile
                    isChild
                    url={
                      "http://localhost:3000/image/" + highlightIds[1].thumbnail
                    }
                    render={props => (
                      <Box>
                        <Image src={props.url} />
                      </Box>
                    )}
                  />
                  <Tile
                    isChild
                    url={
                      "http://localhost:3000/image/" + highlightIds[2].thumbnail
                    }
                    render={props => (
                      <Box>
                        <Image src={props.url} />
                      </Box>
                    )}
                  />
                </Tile>
                <Tile isParent isVertical>
                  <Tile
                    isChild
                    url={
                      "http://localhost:3000/image/" + highlightIds[3].thumbnail
                    }
                    render={props => (
                      <Box>
                        <Image src={props.url} />
                      </Box>
                    )}
                  />
                  <Tile
                    isChild
                    url={
                      "http://localhost:3000/image/" + highlightIds[4].thumbnail
                    }
                    render={props => (
                      <Box>
                        <Image  src={props.url} />
                      </Box>
                    )}
                  />
                </Tile>
              </Tile>
            );
          }
        }}
      </Query>
    );
  }
}

HighlightContainer.propTypes = {
  userId: PropTypes.string.isRequired
};
