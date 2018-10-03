import React, {Component} from 'react';

import SuggestionBox from './suggestion_box.js';

class Suggestions extends Component {
  constructor(props) {
    super(props);



    this.state = {

    } //end of state
  } //end of constructor

  render(){


    return(
      <div className='suggestions'>
        <span>Suggestions</span>
        <SuggestionBox onClick={suggestion => this.props.onClick(suggestion)}/>
      </div>
    );
  }
}

export default Suggestions
