import React, { Component } from "react";
import ReactDOM from 'react-dom';

import Header from './components/Header/header.js'
import SearchBar from './components/SearchBar/search_bar.js'
import Logo from './components/logo.js'
import CompleteSearch from './components/SearchResults/CompleteSearch.js'

class  App extends Component{
  constructor(props) {
    super(props)

    this.state = {
      isShowing: false,
      user: {}
    }
  }

//making a test request to the backend
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({...this.state, user: res.User}))
  }

  callApi = async () => {
    const response = await fetch('http://localhost:5000/Profile');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

//when clicking on suggestions show them in the search bar
showResults = () => {
  this.setState({...this.state, isShowing: true});

  var Logo = document.getElementById('logo');
  Logo.classList.remove('logo-big');
  Logo.classList.add('logo-small');


}


  render(){
    return (
        <div className="all">
          <Header />
          <Logo />
          <SearchBar onSearching={this.showResults} />
          <CompleteSearch isShowing={this.state.isShowing}/>
        </div>
    );
  }
}

ReactDOM.render(<App  />, document.getElementById('root'));
