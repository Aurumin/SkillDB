import React, {Component} from 'react';

class WillLevel extends Component {
  constructor(props) {
    super(props);

    this.state = {}

  }

  render(){return (
        <div className="div-willLevel">
        {this.props.willLevel === 3 ?
          <span className="willLevel">
            <img src={require('./will-level-on.png')} className='skill-level-icon'/>
            <img src={require('./will-level-on.png')} className='skill-level-icon'/>
            <img src={require('./will-level-on.png')} className='skill-level-icon'/>
          </span> : null}
        {this.props.willLevel === 2 ?
          <span className="willLevel">
            <img src={require('./will-level-on.png')} className='skill-level-icon'/>
            <img src={require('./will-level-on.png')} className='skill-level-icon'/>
            <img src={require('./will-level-on.png')} className='skill-level-icon skillWillLevelOf'/>
          </span> : null}
        {this.props.willLevel === 1 ?
          <span className="willLevel">
            <img src={require('./will-level-on.png')} className='skill-level-icon'/>
            <img src={require('./will-level-on.png')} className='skill-level-icon skillWillLevelOf'/>
            <img src={require('./will-level-on.png')} className='skill-level-icon skillWillLevelOf'/>
          </span> : null}
        {this.props.willLevel === 0 ?
          <span className="willLevel">
            <img src={require('./will-level-on.png')} className='skill-level-icon skillWillLevelOf'/>
            <img src={require('./will-level-on.png')} className='skill-level-icon skillWillLevelOf'/>
            <img src={require('./will-level-on.png')} className='skill-level-icon skillWillLevelOf'/>
          </span> : null}
        </div>
    );
  }

}

export default WillLevel
