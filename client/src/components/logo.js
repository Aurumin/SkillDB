import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Logo extends Component {
  constructor(props) {
    super(props);

  }


  render(){
    return (
      <div className="logo-container">
      <div className="logo-img">
        <img id='logo' src={require('./logo.png')} alt='placeholder-logo' />
        </div>
        <div>
        <span id="iskill">iskill</span>
        </div>
      </div>
    );
  }
}

export default Logo
