import React  from 'react';
import Main from '../main'
export class SlideToTop extends Main {
  constructor(props){
    super(props);
    this.state = {
      intervalId: 0,
      scrollStepInPx : 50,
      delayInMs : 16.66
    };
    this.scrollToTop.bind(this);
    this.scrollStep.bind(this);
  }
  componentDidMount(){
    this.scrollToTop();
  }
  scrollStep() {
    var scrollStepInPx = this.props.scrollStepInPx ? this.props.scrollStepInPx : this.state.scrollStepInPx;
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - scrollStepInPx);
  }
  scrollToTop() {
    var delayInMs = this.props.delayInMs ? this.props.delayInMs : this.state.delayInMs;    
    let intervalId = setInterval(this.scrollStep.bind(this), delayInMs);
    this.setState({ intervalId: intervalId });
  }
  render() {
    if(this.props.button){
      return (<button onClick={ () => { this.scrollToTop(); }} className="scroll-top">Top</button>)
    }
    else{
      return null
    }    
  }
}
export default SlideToTop