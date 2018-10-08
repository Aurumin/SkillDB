import React, {Component} from 'react';

import ProfileOverview from '../profile/profileoverview.js'
import Modal from './modal.js'

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
        user: {
          profileIMG: "./profilepic.JPG",
          name: "Alexander Böckle",
          department: 'Software Engineering',
          currentSemester: "Orientation Semester",
          SlackID: "asdf",
          skill: ['HTML', 2,0],
          skills: {
            SE: [['HTML', 2,2], ['CSS', 2,2], ['Java', 1,1], ['React.js', 1,0], ['CSS', 2,2], ['Java', 1,1], ['React.js', 1,0], ['CSS', 2,2], ['Java', 1,1], ['React.js', 1,0], ['CSS', 2,2], ['Java', 1,1], ['React.js', 1,0]],
            PM: [['User Interview',1,1],['User Interview',1,1],['User Interview',1,1]]
          },
          isTutor: true
        },
        show: false
    }//end of state
  }//end of constructor

//gets the current Users Data
  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({...this.state, user: res.User}))
  // }
  //
  // callApi = async () => {
  //   const response = await fetch('http://localhost:5000/Profile');
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);
  //   return body;
  // }


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
    <a href='http://slack.com'>
      <img className="slack" src={require('./slack.png')} />
    </a>
      <Modal show={this.state.show} handleClose={this.hideModal} className="modal">
          <ProfileOverview userInfo={this.state.user}/>
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
