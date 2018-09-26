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

onButtonClick = (suggestion) => {
  var term = suggestion;
  this.setState({term});
}

changeLogoSize = () => {
  var Logo = document.getElementById('logo');
  var SkillDB = document.getElementById('skilldb');
  Logo.classList.remove('logo-big');
  Logo.classList.add('logo-small');
  SkillDB.style.display = 'none';
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
            <button onClick={this.changeLogoSize} className = 'searchButton'> <i className="fas fa-search"></i> </button>
          </div>
          <Suggestions onClick = {(suggestion) => this.onButtonClick(suggestion)} searchTerm={this.state.term}/>
        </div>
      );
    }


}

export default SearchBar
