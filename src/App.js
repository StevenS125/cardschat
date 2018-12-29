import React, { Component } from 'react';


// styles
import './styles/index.scss';

//  components
import Layout from "./components/Layout.js"

class App extends Component {
  render() {
    return (
      <div className="container">
          <Layout title="Cards Chat App" />
      </div>
    );
  }
}

export default App;
