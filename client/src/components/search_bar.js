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
        <input
        className = "searchbar"
        value = {this.state.term}
        onChange = {this.onInputChange}
        placeholder = "search for skills"
        />
      );
    }


}

export default SearchBar
