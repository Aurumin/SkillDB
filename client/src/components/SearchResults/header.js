import React, {Component} from 'react';
import ReactDOM from 'react-dom';

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
          <div id='skill-level' className="tooltip">
            <span>skill-level</span>
            <span className="tooltiptext">Skill-Level determines your ability based on the CODE system<br/>0 - no knowledge<br/>1 - beginner<br/>2 - experienced<br/>3 - expert</span>
          </div>

          <div id='will-level' className="tooltip">
            <span>will-level</span>
            <span className="tooltiptext">Skill-Level determines your ability based on the CODE system<br/>0 - not interested<br/>1 - little interested<br/>2 - interested<br/>3 - highly interested</span>
          </div>
        </div>
        </div>
        <hr />

      </div>
    );
  }

}

export default Header;
