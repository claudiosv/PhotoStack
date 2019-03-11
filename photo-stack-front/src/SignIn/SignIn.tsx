import React from "react";
import PropTypes from "prop-types";
import {
  Title,
  Field,
  Label,
  Control,
  Input,
  Checkbox,
  Box,
  Button
} from "bloomer";

export default class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      psw: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlekeyPress = this.handlekeyPress.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handlekeyPress(e) {
    if (e.keyCode == 13) {
      this.props.onSignIn(this.state.email, this.state.psw);
    }
  }

  render() {
    const { email, psw } = this.state;
    const { onSignIn, error } = this.props;
    return (
      <>
        <Title>Sign in</Title>
        {error === "" ? null : (
          <article className="message is-danger">
            <div className="message-body">{error}</div>
          </article>
        )}
        <Box hasTextAlign="left">
          <Field>
            <Label>Email</Label>
            <Control>
              <Input
                isSize="large"
                name="email"
                type="email"
                placeholder="Your email..."
                value={email}
                onKeyDown={this.handlekeyPress}
                onChange={this.handleChange}
              />
            </Control>
          </Field>
          <Field>
            <Label>Password</Label>
            <Control>
              <Input
                isSize="large"
                name="psw"
                type="password"
                placeholder="Your password..."
                value={psw}
                onKeyDown={ev => {
                  if (ev.key === "Enter") {
                    // ev.preventDefault();
                    onSignIn(email, psw);
                  }
                }}
                onChange={this.handleChange}
              />
            </Control>
          </Field>
          <Field>
            <Control>
              <Checkbox isUnselectable> Remember me</Checkbox>
            </Control>
          </Field>
          <Field>
            <Button
              isFullWidth
              isSize="large"
              isColor="info"
              onClick={() => onSignIn(email, psw)}
            >
              Sign in
            </Button>
          </Field>
        </Box>
        <p>
          <a href="/signup">Sign-up</a> ·{" "}
          <a href="/forgot_psw">Forgot Password</a>
        </p>
      </>
    );
  }
}

SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired
};
