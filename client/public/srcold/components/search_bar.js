import React, { Component } from 'react';


class SearchBar extends React.Component {
  constructor(props){
    super(props);
      this.state = { term: ''};
  }
  render(){
    return (
      <div className="search_bar">
      <input
      value = {this.state.term}
      onChange={(event) => this.onInputChange(event.target.value)}
      />
      </div>
    );
    // return <input onChange={this.onInputChange}/>
  }

//   onInputChange(event){
//     console.log(event.target.value);
//   }

  onInputChange(term){
    this.setState({term});
    this.props.onSearchTermChange(term);
  }
 }

export default SearchBar;
