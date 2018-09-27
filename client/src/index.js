import React, { Component } from "react";
import ReactDOM from 'react-dom';

import SearchBar from './components/SearchBar/search_bar.js'
import Logo from './components/logo.js'
import CompleteSearch from './components/SearchResults/CompleteSearch.js'

class  App extends Component{
  constructor(props) {
    super(props)

    this.state = {
      isShowing: false
    }
  }

showResults = () => {
  this.setState({...this.state, isShowing: true});

  var Logo = document.getElementById('logo');
  var SkillDB = document.getElementById('skilldb');
  Logo.classList.remove('logo-big');
  Logo.classList.add('logo-small');
  SkillDB.style.display = 'none';

}


  render(){
    return (
        <div className="all">
          <Logo />
          <SearchBar onSearching={this.showResults} />
          <CompleteSearch isShowing={this.state.isShowing}/>
        </div>
    );
  }
}

ReactDOM.render(<App  />, document.getElementById('root'));
