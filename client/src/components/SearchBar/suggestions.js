import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import SuggestionBox from './suggestion_box.js';

class Suggestions extends Component {
  constructor(props) {
    super(props);



    this.state = {
      //end of skilldb
    } //end of state
  } //end of constructor

displaySuggestions = () => {

}

  render(){


    return(
      <div className='suggestions'>
        <span>Suggestions</span>
        <SuggestionBox />
      </div>
    );
  }
}

export default Suggestions
