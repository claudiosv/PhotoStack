import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import {
  Hero,
  Section,
  Container,
  Box,
  Button,
  Navbar,
  Content,
  Card,
  Media,
  Image,
  Heading,
  Column,
  Columns
} from "react-bulma-components/full";
// new way better one down here 
import {
  Field,
  Control,
  Label,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Help
} from "react-bulma-components/lib/components/form";
import "./App.sass";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }
  onChange = evt => {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    this.setState({
      [evt.target.name]: value
    });
    console.log("Changed! ", value);
    console.log("State: ", this.state);
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <Navbar color="light" fixed="top">
          <Navbar.Brand>
            <Navbar.Item renderAs="a" href="#">
              <img
                src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMi4wMDEgNTEyLjAwMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyLjAwMSA1MTIuMDAxOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGODBCRDsiIGQ9Ik01MDIuMDQ0LDM2MS41MDJsLTkzLjkwNi00NS4zMzNsLTE0NC40OCw2OS43NDdjLTQuODM4LDIuMzM2LTEwLjQ3NywyLjMzNi0xNS4zMTUsMGwtMTQ0LjQ4LTY5Ljc0NyAgTDkuOTU2LDM2MS41MDJjLTEzLjI3NSw2LjQwOS0xMy4yNzUsMjUuMzE1LDAsMzEuNzI0bDIzOC4zODYsMTE1LjA4MWM0LjgzOCwyLjMzNSwxMC40NzcsMi4zMzUsMTUuMzE1LDBsMjM4LjM4Ni0xMTUuMDgxICBDNTE1LjMxOSwzODYuODE3LDUxNS4zMTksMzY3LjkxMSw1MDIuMDQ0LDM2MS41MDJ6Ii8+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6I0Y5NjJCMTsiIGQ9Ik0xMDYuOTIyLDMzOS42NzVMMTA2LjkyMiwzMzkuNjc1bDExOS4xNzksNTcuNTMzYzQuODM4LDIuMzM1LDEwLjQ3NywyLjMzNSwxNS4zMTUsMGwxNjcuMjk3LTgwLjc2MiAgIGwtMC41NzUtMC4yNzdsLTE0NC40OCw2OS43NDhjLTQuODM4LDIuMzM2LTEwLjQ3NywyLjMzNi0xNS4zMTUsMGMtNC4zOTEtMi4xMi0xMzcuMjI2LTY2LjI0Ni0xNDQuNDc5LTY5Ljc0OGwwLDBoLTAuMDAxICAgbC0yMi44MTcsMTEuMDE1bDAsMEwxMDYuOTIyLDMzOS42NzV6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRjk2MkIxOyIgZD0iTTMxLjMzMywzODAuNDE5YzAsMC0xOC4yNDQtNy41MDEtMjAuNDU0LTE5LjM2MmwtMC45MjMsMC40NDZjLTIuMDc0LDEuMDAxLTMuODI0LDIuMzA4LTUuMjUsMy44MjQgICBjLTcuNyw4LjE4OC01Ljk1LDIyLjQ5Myw1LjI1MSwyNy45YzQuOTI1LDIuMzc4LDIxMi44MTcsMTAyLjczNywyMzguMzg2LDExNS4wOGM0LjcwNCwyLjI3MSwxMC4zNjEsMi4zOTIsMTUuMzE1LDBsMTYuMjk2LTcuODY3ICAgTDMxLjMzMywzODAuNDE5eiIvPgo8L2c+CjxwYXRoIHN0eWxlPSJmaWxsOiMwMDhDRkY7IiBkPSJNNTAyLjA0NCwyNDAuMTM4bC05My45MDYtNDUuMzM0bC0xNDQuNDgsNjkuNzQ4Yy00LjgzOCwyLjMzNi0xMC40NzcsMi4zMzYtMTUuMzE1LDBsLTE0NC40OC02OS43NDggIEw5Ljk1NiwyNDAuMTM4Yy0xMy4yNzUsNi40MDgtMTMuMjc1LDI1LjMxNSwwLDMxLjcyNGwyMzguMzg2LDExNS4wOGM0LjgzOCwyLjMzNiwxMC40NzcsMi4zMzYsMTUuMzE1LDBsMjM4LjM4Ni0xMTUuMDggIEM1MTUuMzE5LDI2NS40NTQsNTE1LjMxOSwyNDYuNTQ3LDUwMi4wNDQsMjQwLjEzOHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzAwQzNGRjsiIGQ9Ik0yNDguMzQzLDMuNjk0TDkuOTU3LDExOC43NzVjLTEzLjI3NSw2LjQwOC0xMy4yNzUsMjUuMzE2LDAsMzEuNzI0TDI0OC4zNDMsMjY1LjU4ICBjNC44MzgsMi4zMzUsMTAuNDc3LDIuMzM1LDE1LjMxNSwwbDIzOC4zODYtMTE1LjA4MWMxMy4yNzUtNi40MDgsMTMuMjc1LTI1LjMxNiwwLTMxLjcyNEwyNjMuNjU4LDMuNjk0ICBDMjU4LjgyLDEuMzU4LDI1My4xODEsMS4zNTgsMjQ4LjM0MywzLjY5NHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzAwQUFGMDsiIGQ9Ik02LjIwMiwxMjEuMjAyYy05LjM2Myw3Ljg0NC04LjExOCwyMy41NjUsMy43NTUsMjkuMjk2bDIzOC4zODYsMTE1LjA4MSAgYzQuODM4LDIuMzM1LDEwLjQ3NywyLjMzNSwxNS4zMTUsMGwxNi4yOTYtNy44NjdMMzEuMzMzLDEzNy42OTJDMzEuMzMzLDEzNy42OTIsMTQuNDI4LDEzMC42NjEsNi4yMDIsMTIxLjIwMnoiLz4KPGc+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMDM4NUREOyIgZD0iTTEwNi45MjIsMjE4LjMxMkwxMDYuOTIyLDIxOC4zMTJsMTE5LjE3OSw1Ny41MzNjNC44MzgsMi4zMzUsMTAuNDc3LDIuMzM1LDE1LjMxNSwwbDE2Ny4yOTctODAuNzYyICAgbC0wLjU3NS0wLjI3N2wtMTQ0LjQ4LDY5Ljc0OGMtNC44MzgsMi4zMzYtMTAuNDc3LDIuMzM2LTE1LjMxNSwwYy00LjM5MS0yLjEyLTEzNy4yMjYtNjYuMjQ2LTE0NC40NzktNjkuNzQ4bDAsMGgtMC4wMDEgICBMODEuMDQ2LDIwNS44MmwwLDBMMTA2LjkyMiwyMTguMzEyeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6IzAzODVERDsiIGQ9Ik0zMS4zMzMsMjU5LjA1NWMwLDAtMTguMjQ0LTcuNTAxLTIwLjQ1NC0xOS4zNjJsLTAuOTIzLDAuNDQ2Yy0yLjA3NCwxLjAwMS0zLjgyNCwyLjMwOC01LjI1LDMuODI0ICAgYy03LjcsOC4xODgtNS45NSwyMi40OTMsNS4yNTEsMjcuOWwyMDMuNTUxLDk4LjI2NGwzNC44MzQsMTYuODE2YzQuNDc3LDIuMTYyLDEwLjE2MiwyLjQ4OCwxNS4zMTUsMGwxNi4yOTYtNy44NjdMMzEuMzMzLDI1OS4wNTV6ICAgIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
                alt="Bulma: a modern CSS framework based on Flexbox"
                width="48"
                height="32"
              />
              PhotoStack
            </Navbar.Item>
            {/* <Navbar.Burger /> */}
          </Navbar.Brand>
          {/* <Navbar.Menu>
          <Navbar.Container>
            <Navbar.Item href="#">Second</Navbar.Item>
          </Navbar.Container>
          <Navbar.Container position="end">
            <Navbar.Item href="#">At the end</Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu> */}
        </Navbar>
        <Columns mobile style={{ marginTop: "40px" }}>
          <Columns.Column size="half" offset="one-quarter">
            <Card>
              <Card.Header>
                <Card.Header.Title>Login</Card.Header.Title>
              </Card.Header>
              <Card.Content>
                <Field>
                  <Label>Email</Label>
                  <Control>
                    <Input
                      // color="danger"
                      name="email"
                      type="email"
                      placeholder="Email input"
                      onChange={this.onChange}
                      value={email}
                    />
                  </Control>
                  {/* <Help color="danger">This email is invalid</Help> */}
                </Field>
                <Field>
                  <Label>Password</Label>
                  <Control>
                    <Input
                      // color="danger"
                      name="password"
                      type="password"
                      placeholder="Password input"
                      onChange={this.onChange}
                      value={password}
                    />
                  </Control>
                </Field>
              </Card.Content>
              <Card.Footer>
                <Card.Footer.Item renderAs="a" href="#Yes">
                  Login
                </Card.Footer.Item>
                <Card.Footer.Item renderAs="a" href="#No">
                  Register
                </Card.Footer.Item>
              </Card.Footer>
            </Card>
          </Columns.Column>
        </Columns>
      </div>
    );
  }
}

export default App;
