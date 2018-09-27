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
      }//end of skilldb
    }
  }



  render(){

    let skills = this.state.skilldb.softwareengineer.webdevelopment;

    const skillList = skills.map(clickedTerm => {

      return (
        <span key={clickedTerm}
        onClick = {() => {
          this.props.onClick(clickedTerm);
        }}
        className="suggestion-text">{clickedTerm}</span>
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
