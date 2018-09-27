import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import SkillLevel from './skillLevel.js';
import WillLevel from './willLevel.js';

class SearchedProfiles extends Component {
  constructor(props) {
    super(props);

    this.state = {

      user1: {
        profileIMG: '',
        name: 'Alexander Boeckle',
        department: 'Software Engineering',
        skill: 'HTML',
        skillLevel: 3,
        willLevel: 1,
        slack: '',
        tutor: true
      }

    }//end of state
  }//end of constructor

    render(){
      return (
        <div className='complete-searched-profiles'>
          <div className="searched-profile">
            <div className='div-name'>
              <span>{this.state.user1.name}</span>
            </div>
            <div className='div-department'>
              <span>{this.state.user1.department}</span>
            </div>
            <div className='div-skill'>
              <span>{this.state.user1.skill}</span>
            </div>
            <div className='div-level-will'>
              <SkillLevel skillLevel={this.state.user1.skillLevel}/>
              <WillLevel willLevel={this.state.user1.willLevel}/>
            </div>
            <div className='div-slack'>
              <a href="http://slack.com">
                <img id='slack' src={require('./slack.png')} />
              </a>
            </div>
        </div>
        <hr />
        </div>
      );
    }

}

export default SearchedProfiles
