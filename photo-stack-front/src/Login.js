import React from "react";
// You can import from the global component (you will need to include the css file dist/react-bulma-components.min.css)
// import { Columns } from 'react-bulma-components';

// You can also include the js that also bundles the css (do not work with server-side rendering)
// import { Columns } from "react-bulma-components/full";

// [RECOMENDED] Or import only the components you will use (this will reduce the total bundle size)
// If you use this approach and want to use the global Bulma styles, import react-bulma-components/src/index.sass and configure webpack to handle sass files
// import Columns from 'react-bulma-components/lib/components/columns';


import {Hero,Section,Container,Box,Field,Label,Control,Input} from "react-bulma-components/full";
// import Section from "react-bulma-components/lib/components/section";
// import Container from "react-bulma-components/lib/components/container";
// import Box from "react-bulma-components/lib/components/box";

class Welcome extends React.Component {
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
              >
                <Field>
                  <Label>Email</Label>
                  <Control>
                    <Input color="danger" type="email" placeholder="Email input" value="hello@" />
                  </Control>
                </Field>
              </Box>
            </Container>
          </Hero.Body>
        </Hero>
      </Section>
    );
  }
}

export default Welcome;
