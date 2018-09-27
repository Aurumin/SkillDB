import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class WillLevel extends Component {
  constructor(props) {
    super(props);

    this.state = {}

  }

  render(){return (
        <div className="div-willLevel">
        {this.props.willLevel == 3 ?  <span className="skillLevel">111</span> : null}
        {this.props.willLevel == 2 ?  <span className="skillLevel">110</span> : null}
        {this.props.willLevel == 1 ?  <span className="skillLevel">100</span> : null}
        {this.props.willLevel == 0 ?  <span className="skillLevel">000</span> : null}
        </div>
    );
  }

}

export default WillLevel
