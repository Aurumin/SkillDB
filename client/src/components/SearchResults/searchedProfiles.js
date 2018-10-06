import React, {Component} from 'react';

import SkillLevel from './skillLevel.js';
import WillLevel from './willLevel.js';

import ProfileOverview from '../profile/profileoverview.js'
import Modal from '../Header/modal.js'

class SearchedProfiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchedUsers: [
        {
          profileIMG: "./profilepic.JPG",
          name: "Alexander Böckle",
          department: 'Software Engineering',
          currentSemester: "Orientation Semester",
          SlackID: "asdf",
          skill: ['HTML', 2,0],
          skills: {
            SE: [['HTML', 2,2], ['CSS', 2,2], ['Java', 1,1], ['React.js', 1,0]],
            PM: [['User Interview',1,1]]
          },
          isTutor: true
        },
          {
            profileIMG: "./profilepic.JPG",
            name: "Chung Leng",
            department: 'Product Management',
            currentSemester: "Orientation Semester",
            SlackID: "asdf",
            skill: ['HTML', 1,3],
            skills: {
              SE: [['HTML', 2,2], ['CSS', 2,2], ['Java', 1,1], ['React.js', 1,0]],
              PM: [['User Interview',1,1],['Management',2,3]],
              ID: [['photoshop',1,2], ['Video Editing',3,2],['invision',1,1]]
            },
            isTutor: false
          },
            {
              profileIMG: "./profilepic.JPG",
              name: "Soyoon Leng",
              department: 'Interaction Desgin',
              currentSemester: "Orientation Semester",
              SlackID: "asdf",
              skill: ['HTML', 1,2],
              skills: {
                PM: [['Marketing',1,1],['Management',2,3]],
                ID: [['photoshop',1,2], ['Video Editing',3,2],['invision',2,3],["UX",3,0]]
              },
              isTutor: true
            }
        ],
        show: false

    }//end of state
  }//end of constructor

  showModal = () => {
  this.setState({...this.state, show: true});
  };

  hideModal = () => {
  this.setState({...this.state, show: false});
  }


    render(){
      var users = this.state.searchedUsers
      var DisplayUsers = users.map(user => {
        return (
          <div className='complete-searched-profiles'>
          <Modal show={this.state.show} handleClose={this.hideModal} className="modal">
              <ProfileOverview userInfo={user} />
            </Modal>
            <button id='header-profileoverview-button' type="button" onClick={this.showModal}>

            <div className="searched-profile">
              <div className='div-name'>
                <span>{user.name}</span>
              </div>
              <div className='div-department'>
                <span>{user.department}</span>
              </div>
              <div className='div-skill'>
                <span>{user.skill[0]}</span>
              </div>
              <div>
                {user.isTutor ? <span className="tutor">TUTOR</span> : <span className="tutor-not-displayed tutor">TUTOR</span>}
              </div>
              <div className='div-level-will'>
                <SkillLevel skillLevel={user.skill[1]}/>
                <WillLevel willLevel={user.skill[2]}/>
              </div>
              <div className='div-slack'>
                <a href="http://slack.com">
                  <img className='slack' src={require('./slack.png')} />
                </a>
              </div>
          </div>
          <hr />
          </button>
          </div>
        );
      })

      return (
        <div>
        {DisplayUsers}
        </div>
      );
    }

}

export default SearchedProfiles
