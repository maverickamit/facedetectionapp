import React, { Component } from "react";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      isButtonLoading: false,
    };
  }
  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };
  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignin = () => {
    this.setState({ isButtonLoading: true });
    fetch("https://radiant-basin-43552.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ isButtonLoading: false });
        if (data.email === this.state.signInEmail) {
          this.props.onRouteChange("home");
          this.props.loadUser(data);
        } else {
          console.log(data);
          alert("Wrong combination of username and password");
        }
      })
      .then();
  };

  render() {
    return (
      <div>
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Sign In</legend>
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
              {this.state.isButtonLoading ? (
                <div className="">
                  <input
                    onClick={this.onSubmitSignin}
                    className="b pa2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="Loading, Please Wait"
                  />
                </div>
              ) : (
                <div className="">
                  <input
                    onClick={this.onSubmitSignin}
                    className="b pa2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="Sign in"
                  />
                </div>
              )}
              <div className="lh-copy mt3">
                <p
                  onClick={() => this.props.onRouteChange("register")}
                  className="f5 pa3 link dim black db pointer"
                >
                  Register
                </p>
                <p>
                  For Testing Purpose Use <br></br>Email: test123@gmail.com,
                  Password: test123
                </p>
              </div>
            </div>
          </main>
        </article>
      </div>
    );
  }
}
export default SignIn;
