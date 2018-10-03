import React, {Component} from 'react';

class Logo extends Component {
  render(){
    return (
      <div className="logo-container">
      <div className="logo-img">
        <img id="logo" className='logo-big' src={require('./logo.png')} alt='placeholder-logo' />
        </div>
        <div>
        <span id="skilldb" className="skilldb-big">skilldb</span>
        </div>
      </div>
    );
  }
}

export default Logo
