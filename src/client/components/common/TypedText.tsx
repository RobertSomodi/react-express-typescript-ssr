import * as React from 'react';

class TypedText extends React.Component<any, any> {
    constructor(props, context) {
      super(props, context);
  
      this.state = {
        text: "",
        show: true,
        underscoreIntervalId: null,
        typingIntervalId: null
      };
    }
  
    componentDidMount() {

      let typingIntervalId = setInterval(() => {
        if(this.props.text.length > this.state.text.length){
            let new_char = this.props.text.charAt(this.state.text.length);
            let new_text = this.state.text.concat('', new_char);
            this.setState({
                text: new_text
            })
        }
        else{
            clearInterval(this.state.typingIntervalId);
            let underscoreIntervalId = setInterval(() => {
                this.setState({
                  show: !this.state.show
                });
              }, 500);
            this.setState({underscoreIntervalId: underscoreIntervalId});
        }
      }, 50);
      this.setState({typingIntervalId: typingIntervalId});
    }
    
    componentWillUnmount() {
        clearInterval(this.state.underscoreIntervalId);
        clearInterval(this.state.typingIntervalId);
    }

    render() {
      return <h3 className="typed-text">
                <span className="sv-color">SV></span>
                {this.state.text}
                <span className={'underscore ml-1 ' + ((this.state.show)? '': 'not-visible')}>_</span>
            </h3>;
    }
  }
  
  export default TypedText;