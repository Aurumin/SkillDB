import React, {Component} from 'react';

class SkilleWillLevelHeader extends Component {
  render(){
    return (
      <div className='div-skill-will-head'>
      <div id='skill-level' className="tooltip">
        <span>SKILL-LEVEL</span>
        <span className="tooltiptext">Skill-Level determines your ability based on the CODE system<br/>0 - no knowledge<br/>1 - beginner<br/>2 - experienced<br/>3 - expert</span>
      </div>

      <div id='will-level' className="tooltip">
        <span>WILL-LEVEL</span>
        <span className="tooltiptext">Will-Level determines your will to work and help with this skill<br/>0 - not interested<br/>1 - little interested<br/>2 - interested<br/>3 - highly interested</span>
      </div>
      </div>
    );
  }
}

export default SkilleWillLevelHeader
