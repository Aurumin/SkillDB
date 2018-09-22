import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    }
  }

onInputChange = (event) => {
  var term = event.target.value;
  this.setState({term});
}

    render(){
      return (
        <div className="searchbar-contianer">
        <input
        className = "searchbar"
        value = {this.state.term}
        onChange = {this.onInputChange}
        placeholder = "search for skills" />
        <button className = 'searchButton'> <i class="fas fa-search"></i> </button>
        </div>
      );
    }


}

export default SearchBar
