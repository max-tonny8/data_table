import React, { Component } from "react";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container mt-3" style={{ maxWidth: '95%'}}>
          <Content />
        </div>
      </div>
    );
  }
}

export default App;
