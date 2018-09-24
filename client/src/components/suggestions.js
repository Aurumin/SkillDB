import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Suggestions extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  } //end of constructor

  render(){
    return(
      <div className='suggestions'>
        <span>Suggestions:</span>
        <div className='suggestion-box'>
          <span className="suggestion-text">HTML</span>
        </div>
      </div>
    );
  }
}

export default Suggestions
