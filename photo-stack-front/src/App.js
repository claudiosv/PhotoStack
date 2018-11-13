import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Hero,
  Section,
  Container,
  Box,
  Field,
  Label,
  Control,
  Input
} from "react-bulma-components/full";

class App extends Component {
  render() {
    return (
      <Section>
        <Hero size="fullheight" color="primary">
          <Hero.Body>
            <Container>
              <Box
                paddingless={false}
                responsive={{
                  mobile: {
                    display: "block"
                  },
                  tablet: {
                    display: "flex"
                  },
                  desktop: {
                    display: "inline-flex",
                    only: true
                  },
                  widescreen: {
                    display: "inline-block"
                  }
                }}
                hide={{
                  tablet: {
                    hide: true,
                    only: true
                  },
                  widescreen: {
                    hide: true
                  }
                }}
              />
            </Container>
          </Hero.Body>
        </Hero>
      </Section>
    );
  }
}

export default App;
