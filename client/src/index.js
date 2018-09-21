import React, { Component } from "react";
import ReactDOM from 'react-dom';

import SearchBar from './components/search_bar.js'

class  App extends Component{
  constructor(props) {
    super(props)

    this.state = {}
  }

  render(){
    return (
        <div>
          <SearchBar />
        </div>
    );
  }
}

ReactDOM.render(<App  />, document.getElementById('root'));
