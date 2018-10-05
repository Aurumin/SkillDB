import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './profileoverview.css';
import SkilleWillLevelHeader from '../SearchResults/skill-will-level-head.js';
import DisplayUserSkills from './display-user-skills.js';



class ProfileOverview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {
        name: "Alexander Böckle",
        course: 'Software Engineering',
        currentSemester: "Orientation Semester",
        SlackID: "asdf",
        skills: {
          SE: [['HTML', 2,2], ['CSS', 2,2], ['Java', 1,1], ['React.js', 1,0]],
          PM: [['User Interview',1,1]],
          ID: [['photoshop',1,2], ['UX',3,2],['invision',1,1]]


        } //end skills
      }//end current User
    }// end state
  }//end constructor

  render() {
    return (
      <div className="profileoverview">
        <div>
          <img className="profilepic-large" src={require('../Header/profilepic.JPG')} />
        </div>
        <div>
          <span>{this.state.currentUser.name}</span>
        </div>
        <div>
          <span>{this.state.currentUser.course}<span id="dot"> &bull; </span>{this.state.currentUser.currentSemester}</span>
        </div>
        <div>
          <img className="slack" src={require('../Header/slack.png')} />
        </div>
        <div className="div-ProfileOverview-header">
          <span id='skill-header'>SKILL</span>
          <SkilleWillLevelHeader />
        </div>
          <DisplayUserSkills skills={this.state.currentUser.skills}/>
          <div className='div-level-will'>

          </div>
      </div>
    );
  }
}

export default ProfileOverview
