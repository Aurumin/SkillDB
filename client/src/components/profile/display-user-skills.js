import React, {Component} from 'react';

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
        <li key={skill} className="li-se">
        <span
        className="seSkill">
        {skill}
        </span>
        </li>
      );
    })
  } else {
    pmSkillList = '';
  }

    var pmSkillList;
    if(pmSkills){
      pmSkillList = pmSkills.map(skill => {
      return (
        <li key={skill} className="li-pm">
        <span
        className="pmSkill">
        {skill}
        </span>
        </li>
      );
    })
  } else {
    pmSkillList = '';
  }


    var idSkillList;
    if(idSkills){
      idSkillList = idSkills.map(skill => {
        return (
          <li key={skill} className="li-id">
          <span
          className="idSkill">
          {skill}
          </span>
          </li>
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
