import React, {Component} from 'react';

class SkillLevel extends Component {
  constructor(props) {
    super(props);

    this.state = {}

  }


  render(){
    return (
        <div className="div-skillLevel">
        {this.props.skillLevel === 3 ?  <span className="skillLevel">111</span> : null}
        {this.props.skillLevel === 2 ?  <span className="skillLevel">011</span> : null}
        {this.props.skillLevel === 1 ?  <span className="skillLevel">001</span> : null}
        {this.props.skillLevel === 0 ?  <span className="skillLevel">000</span> : null}
        </div>
    );
  }

}

export default SkillLevel
