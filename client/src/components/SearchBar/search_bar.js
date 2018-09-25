import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import Suggestions from './suggestions.js'

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '' ,
    }
  }

onInputChange = (event) => {
  var term = event.target.value;
  this.setState({term});
}





    render(){
      return (
        <div className="landing-page">
          <div className="searchbar-contianer">
            <input
            className = "searchbar"
            value = {this.state.term}
            onChange = {this.onInputChange}
          
            placeholder = "search for skills" />
            <button className = 'searchButton'> <i className="fas fa-search"></i> </button>
          </div>
          <Suggestions searchTerm={this.state.term}/>
        </div>
      );
    }


}

export default SearchBar
