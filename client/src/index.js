import React, { Component } from "react";
import ReactDOM from 'react-dom';

import SearchBar from './components/SearchBar/search_bar.js'
import Logo from './components/logo.js'

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
        </div>
    );
  }
}

ReactDOM.render(<App  />, document.getElementById('root'));
