import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './profileoverview.css';
import SkilleWillLevelHeader from '../SearchResults/skill-will-level-head.js';
import DisplayUserSkills from './display-user-skills.js';



class ProfileOverview extends Component {
  constructor(props) {
    super(props);
  }//end constructor




  render() {
    var currentUser = this.props.userInfo;
    if(!currentUser){
        return (<h1>Loding...</h1>)
      }
    return (
      <div className="profileoverview">
        <div>
          <img className="profilepic-large" src={require('../Header/profilepic.JPG')} />
        </div>
        <div className="profileoverview-heading-spacing">
          <span>{currentUser.name}</span>
        </div>
        <div className="profileoverview-heading-spacing">
          <span>{currentUser.department}<span id="dot"> &bull; </span>{currentUser.Semester > 0 && currentUser.Semester < 6 ? "Core Semester" : "Orientation Semester"}</span>
        </div>
        <div className="profileoverview-heading-spacing">
          <img className="slack" src={require('../Header/slack.png')} />
        </div>
        <div className="div-ProfileOverview-header profileoverview-heading-spacing">
          <span id='skill-header'>SKILL</span>
          <SkilleWillLevelHeader />
        </div>
        <div className='div-level-will'>
            <DisplayUserSkills skills={currentUser.skills}/>
          </div>
      </div>
    );
  }
}

export default ProfileOverview
