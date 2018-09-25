import React, {Component} from 'react';

class SuggestionBox extends Component {
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
      }
    }
  }

  render(){

    let skills = this.state.skilldb.softwareengineer.webdevelopment;

    const skillList = skills.map(skill => {

      return (
        <span key={skill}
        onClick = {() => {
          console.log(skill);
        }}
        className="suggestion-text">{skill}</span>
      );
    })

    return(
      <div className='suggestion-box'>
        {skillList}
        </div>
    );
  }

}

export default SuggestionBox
