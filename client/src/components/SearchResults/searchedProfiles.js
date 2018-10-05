import React, {Component} from 'react';

import SkillLevel from './skillLevel.js';
import WillLevel from './willLevel.js';

class SearchedProfiles extends Component {
  constructor(props) {
    super(props);

    this.state = {

      user1: {
        profileIMG: "./profilepic.JPG",
        name: 'Alexander Boeckle',
        department: 'Software Engineering',
        skill: 'HTML',
        skillLevel: 1,
        willLevel: 2,
        slack: '',
        isTutor: true
      },
      searchedUsers: [
          {
            profileIMG: "./profilepic.JPG",
            name: 'Alexander Boeckle',
            department: 'Software Engineering',
            skill: 'HTML',
            skillLevel: 2,
            willLevel: 2,
            slack: '',
            isTutor: true
          },
          {
            profileIMG: "./profilepic.JPG",
            name: 'Leng',
            department: 'Product Management',
            skill: 'HTML',
            skillLevel: 1,
            willLevel: 3,
            slack: '',
            isTutor: false
          }
        ]

    }//end of state
  }//end of constructor



    render(){
      var users = this.state.searchedUsers
      var DisplayUsers = users.map(user => {
        return (
          <div className='complete-searched-profiles'>
            <div className="searched-profile">
              <div className='div-name'>
                <span>{user.name}</span>
              </div>
              <div className='div-department'>
                <span>{user.department}</span>
              </div>
              <div className='div-skill'>
                <span>{user.skill}</span>
              </div>
              <div>
                {user.isTutor ? <span className="tutor">TUTOR</span> : <span className="tutor-not-displayed tutor">TUTOR</span>}
              </div>
              <div className='div-level-will'>
                <SkillLevel skillLevel={user.skillLevel}/>
                <WillLevel willLevel={user.willLevel}/>
              </div>
              <div className='div-slack'>
                <a href="http://slack.com">
                  <img className='slack' src={require('./slack.png')} />
                </a>
              </div>
          </div>
          <hr />
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
