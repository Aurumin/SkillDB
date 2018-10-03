import React, {Component} from 'react';

import ProfileOverview from '../profile/profileoverview.js'
import Modal from './modal.js'

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
        },
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
  return (
    <div className="div-header">
      <ul className="menu-header">
        <li className="pages-header selected-page-header">Home</li>
        <li className="pages-header">About</li>
        <li className="pages-header">Tutor</li>
      </ul>
    <div className="profile-link-header">
      <img className="slack" src={require('./slack.png')} />

      <Modal show={this.state.show} handleClose={this.hideModal}>
          <ProfileOverview />
        </Modal>
        <button id='header-profileoverview-button' type="button" onClick={this.showModal}>
          <img className="profilepic" src={require('./profilepic.JPG')} />
        </button>

    </div>
    </div>
  );
}

}

export default Header
