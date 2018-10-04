import React, {Component} from 'react';
import SkilleWillLevelHeader from './skill-will-level-head.js';

class Header extends Component{

  render(){
    return (
      <div className='searchresult-header'>
      <div className='algin-header'>
        <div className='div-name'>
          <span>name</span>
        </div>
        <div className='div-department'>
          <span>department</span>
        </div>
        <div className='div-skill'>
          <span>skill</span>
        </div>

        <div className='div-level-will'>
          <SkilleWillLevelHeader />
        </div>
        </div>
        <hr />

      </div>
    );
  }

}

export default Header;
