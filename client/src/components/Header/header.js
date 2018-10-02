import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
        user1: {
          profileIMG: "./profilepic.JPG",
          name: 'Alexander Boeckle',
          department: 'Software Engineering',
          skill: 'HTML',
          skillLevel: 3,
          willLevel: 1,
          slack: '',
          isTutor: true
        }
    }//end of state
  }//end of constructor

render(){
  return (
    <div className="div-header">
      <ul className="menu-header">
        <li className="pages-header selected-page-header">Home</li>
        <li className="pages-header">About</li>
        <li className="pages-header">Tutor</li>
      </ul>
    <div className="profile-link-header">
      <img className="slack" src={require('./slack.png')} />
      <img className="profilepic" src={require('./profilepic.JPG')} />

    </div>
    </div>
  );
}

}

export default Header
