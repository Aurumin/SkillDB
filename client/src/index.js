import React, { Component } from "react";
import ReactDOM from 'react-dom';

import SearchBar from './components/search_bar.js'
import Logo from './components/logo.js'
import Suggestions from './components/suggestions.js'

class  App extends Component{
  constructor(props) {
    super(props)

    this.state = {}
  }

  render(){
    return (
        <div className="all">
          <Logo />
          <SearchBar />
          <Suggestions />
        </div>
    );
  }
}

ReactDOM.render(<App  />, document.getElementById('root'));
