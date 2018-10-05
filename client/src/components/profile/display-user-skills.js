import React, {Component} from 'react';
import SkillLevel from '../SearchResults/skillLevel.js';
import WillLevel from '../SearchResults/willLevel.js';

class DisplayUserSkills extends Component {
  constructor(props){
    super(props);
  }
  render(){


    let seSkills = this.props.skills.SE
    let pmSkills = this.props.skills.PM
    let idSkills = this.props.skills.ID

    var seSkillList;
    if(seSkills){
      seSkillList = seSkills.map(skill => {
      return (
        <div className="display-user-skills">
        <div className="div-user-skill">
        <li key={skill[0]} className="li-se">
        <span
        className="seSkill">
        {skill[0]}
        </span>
        </li>
        </div>
        <div className="div-user-skillwill">
        <SkillLevel skillLevel={skill[1]}/>
        <WillLevel willLevel={skill[2]}/>
        </div>
        </div>
      );
    })
  } else {
    seSkillList = '';
  }

    var pmSkillList;
    if(pmSkills){
      pmSkillList = pmSkills.map(skill => {
      return (
        <div className="display-user-skills">
        <div className="div-user-skill">
        <li key={skill[0]} className="li-pm">
        <span
        className="pmSkill">
        {skill[0]}
        </span>
        </li>
        </div>
        <div className="div-user-skillwill">
        <SkillLevel skillLevel={skill[1]}/>
        <WillLevel willLevel={skill[2]}/>
        </div>
        </div>
      );
    })
  } else {
    pmSkillList = '';
  }


    var idSkillList;
    if(idSkills){
      idSkillList = idSkills.map(skill => {
        return (
          <div className="display-user-skills">
          <div className="div-user-skill">
          <li key={skill[0]} className="li-id">
          <span
          className="idSkill">
          {skill[0]}
          </span>
          </li>
          </div>
          <div className="div-user-skillwill">
          <SkillLevel skillLevel={skill[1]}/>
          <WillLevel willLevel={skill[2]}/>
          </div>
          </div>
        );
      });
    } else {
      idSkillList = '';
    }



    return (
      <div>
        <ul className="skill-list">
        {this.props.skills.SE ? <li key="se" id='se-header' className='skill-title'>SE</li>:''}
        {seSkillList}
        </ul>
        <ul className="skill-list">
        {this.props.skills.PM ? <li key="pm" id='pm-header' className='skill-title'>PM</li>:''}
        {pmSkillList}
        </ul>
        <ul className="skill-list">
        {this.props.skills.ID ? <li key="id" id='id-header' className='skill-title'>ID</li>:''}
        {idSkillList}
        </ul>
      </div>
    );
  }
}

export default DisplayUserSkills
