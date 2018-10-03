import React, {Component} from 'react';

import Header from './header.js';
import SearchedProfiles from './searchedProfiles.js';

class CompleteSearch extends Component {
  constructor(props) {
    super(props);

    this.state ={
    } // end of state
  } // end of constructor

  render(){
    return (
      <div id="searched-profiles" className={this.props.isShowing ? "" : "hidden"}>
        <Header />
        <SearchedProfiles />
      </div>
    );
  }
}

export default CompleteSearch;
