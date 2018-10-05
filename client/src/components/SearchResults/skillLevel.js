import React, {Component} from 'react';

class SkillLevel extends Component {
  constructor(props) {
    super(props);

    this.state = {}

  }


  render(){
    return (
        <div className="div-skillLevel">
        {this.props.skillLevel === 3 ?
          <span className="skillLevel">
            <img src={require('./skill-level-on.png')} className='skill-level-icon'/>
            <img src={require('./skill-level-on.png')} className='skill-level-icon'/>
            <img src={require('./skill-level-on.png')} className='skill-level-icon'/>
          </span> : null}
        {this.props.skillLevel === 2 ?
          <span className="skillLevel">
          <img src={require('./skill-level-on.png')} className='skill-level-icon skillWillLevelOf'/>
          <img src={require('./skill-level-on.png')} className='skill-level-icon'/>
          <img src={require('./skill-level-on.png')} className='skill-level-icon'/>
          </span> : null}
        {this.props.skillLevel === 1 ?
          <span className="skillLevel">
            <img src={require('./skill-level-on.png')} className='skill-level-icon skillWillLevelOf'/>
            <img src={require('./skill-level-on.png')} className='skill-level-icon skillWillLevelOf'/>
            <img src={require('./skill-level-on.png')} className='skill-level-icon'/>
          </span> : null}
        {this.props.skillLevel === 0 ?
          <span className="skillLevel">
          <img src={require('./skill-level-on.png')} className='skill-level-icon skillWillLevelOf'/>
          <img src={require('./skill-level-on.png')} className='skill-level-icon skillWillLevelOf'/>
          <img src={require('./skill-level-on.png')} className='skill-level-icon skillWillLevelOf'/>
          </span> : null}
        </div>
    );
  }

}

export default SkillLevel
