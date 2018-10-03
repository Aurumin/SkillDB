import React, {Component} from 'react';
//import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import './profileoverview.css'


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
          SE: ['HTML': [2,2], 'CSS': [2,2], 'JavaScript': [1,1], 'React.js': [1,0]],
          PM: {'Management': [1,1]},
          ID: ''


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

      </div>
    );
  }
}

export default ProfileOverview
