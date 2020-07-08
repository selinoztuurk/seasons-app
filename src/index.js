import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
  constructor(props) {
    super(props);

    // the only "direct assignment" to state
    this.state = { lat: null, errorMessage: "" };
  }

  // state = { lat: null, errorMessage: "" }; // optional way to initialize state

  componentDidMount() {
    // good place to do data loading
    console.log("My component was rendered to the screen");

    window.navigator.geolocation.getCurrentPosition(
      (position) =>
        this.setState({
          lat: position.coords.latitude,
        }),
      (err) => {
        this.setState({ errorMessage: err.message });
      }
    );
  }

  componentDidUpdate() {
    // good place to do data loading upon some state change
    console.log("My component was re-rendered to the screen");
  }

  componentWillUnmount() {
    // good place to do clean-up
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }
    return <Spinner message="Please accept location request" />;
  }

  // React says we have to define render()!!!
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
