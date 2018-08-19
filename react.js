const KEYS = [{
  padId: 'seven',
  unicode: '\u0037',
  digit: 7
}, {
  padId: 'eight',
  unicode: '\u0038',
  digit: 8
}, {
  padId: 'nine',
  unicode: '\u0039',
  digit: 9
}, {
  padId: 'divide',
  unicode: '\u00F7',
  digit: ''
}, {
  padId: 'undo',
  unicode: '\u21B6',
  digit: ''
}, {
  padId: 'clear',
  unicode: '\u0043',
  digit: ''
}, {
  padId: 'four',
  unicode: '\u0034',
  digit: 4
}, {
  padId: 'five',
  unicode: '\u0035',
  digit: 5
}, {
  padId: 'six',
  unicode: '\u0036',
  digit: 6
}, {
  padId: 'multiply',
  unicode: '\u00D7',
  digit: ''
}, {
  padId: 'leftBrecket',
  unicode: '\u0028',
  digit: ''
}, {
  padId: 'rightBrecket',
  unicode: '\u0029',
  digit: ''
}, {
  padId: 'one',
  unicode: '\u0031',
  digit: 1
}, {
  padId: 'two',
  unicode: '\u0032',
  digit: 2
}, {
  padId: 'three',
  unicode: '\u0033',
  digit: 3
}, {
  padId: 'subtract',
  unicode: '\u2212',
  digit: ''
}, {
  padId: 'square',
  unicode: 'x\u00B2',
  digit: ''
}, {
  padId: 'squareRoot',
  unicode: '\u221A',
  digit: ''
}, {
  padId: 'zero',
  unicode: '\u0030',
  digit: 0
}, {
  padId: 'decimal',
  unicode: '\u002E',
  digit: ''
}, {
  padId: 'percent',
  unicode: '\u0025',
  digit: ''
}, {
  padId: 'add',
  unicode: '\u002B',
  digit: ''
}, {
  padId: 'equals',
  unicode: '\u003D',
  digit: ''
}];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      accumulator: '',
      numbers: []
    }
    this.reciveData = this.reciveData.bind(this);
  }
  reciveData(value) { //add digit & operators to array; regEx for reduce.
    value.padId === 'clear' ? this.setState({accumulator: ''}) :  
    this.setState({accumulator: this.state.accumulator + value.unicode});
  }
  render() {
    const arrToRender = this.props.keys.map(x => 
      <Pad padId={x.padId} unicode={x.unicode} digit={x.digit} reciveData={this.reciveData} />)
    return(
      <div id="calc">
        <Display accumulator={this.state.accumulator} />        
          {arrToRender}        
      </div>
    );
  }
}

class Pad extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const value = {
      padId: this.props.padId,
      unicode: this.props.unicode,
      digit: this.props.digit
    };
    //console.log('value');
    this.props.reciveData(value);
  }
  render() {
    return(
      <div id={this.props.padId} className="pads" onClick={this.handleClick}>
        {this.props.unicode}
      </div>
    );
  }
}
const Display = (props) => {
  return (
    <div id="display" >
      {props.accumulator === '' ? '0' : props.accumulator}
    </div>
  );
}
ReactDOM.render(<App keys={KEYS}/>, document.getElementById('root'));
