import React, { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registeredName: "",
      registeredEmail: "",
      registeredPassword: ""
    };
  }
  onNameChange = event => {
    this.setState({ registeredName: event.target.value });
  };

  onEmailChange = event => {
    this.setState({ registeredEmail: event.target.value });
  };
  onPasswordChange = event => {
    this.setState({ registeredPassword: event.target.value });
  };

  onSubmitRegister = () => {
    

    fetch("https://radiant-basin-43552.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.registeredName,
        email: this.state.registeredEmail,
        password: this.state.registeredPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data === "unable to register") {
          alert("Unable to Register");
          this.props.onRouteChange("register");
        } else {
          this.props.onRouteChange("home");
          this.props.loadUser(data);
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <div>
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    name="name"
                    id="name"
                    onChange={this.onNameChange}
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                  />
                </div>
                <label className="pa0 ma0 lh-copy f6 pointer"> </label>
              </fieldset>
              <div className="">
                <input
                  onClick={this.onSubmitRegister}
                  className="b pa2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Register"
                />
              </div>
              <div className="lh-copy mt3">
                <p
                  onClick={() => onRouteChange("signin")}
                  className="f5 pa3 link dim black db pointer"
                >
                  Sign in
                </p>
              </div>
            </div>
          </main>
        </article>
      </div>
    );
  }
}

// const Register = ({ onRouteChange }) => {
//   return;
// };

export default Register;
