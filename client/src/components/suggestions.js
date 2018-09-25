import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Suggestions extends Component {
  constructor(props) {
    super(props);



    this.state = {
      skilldb: {
        'softwareengineer': {
                'webdevelopment': ['html', 'css', 'javascript', 'React'],
                'programming': ['python', 'swift', 'java'],
                'database': ['mongodb', 'MySQL', 'SQL', 'Firebase']
              },
        'product management': {
          'marketing': ['Facebook Ads', 'Google Ads', 'SEO', 'Branding'],
        },
        'interaction desgin': {
          'logo': ['photoshop', 'gimp'],
          'wireframe': ['invision', 'adobe']
        }
      }//end of skilldb
    } //end of state
  } //end of constructor

displaySuggestions = () => {

}

  render(){
    let skills = this.state.skilldb.softwareengineer.webdevelopment;
    //console.log(this.state.skilldb.softwareengineer.webdevelopment.includes(this.props.searchTerm));
  //  console.log(this.state.skilldb.includes('softwareengineer'));

    const skillList = skills.map(skill => {

      return (
        <span key={skill} onClick = {() => {
          console.log(skill);
        }} className="suggestion-text">{skill}</span>
      );
    })

    return(
      <div className='suggestions'>
        <span>Suggestions</span>
        <div className='suggestion-box'>
          {skillList}

        </div>
      </div>
    );
  }
}

export default Suggestions
