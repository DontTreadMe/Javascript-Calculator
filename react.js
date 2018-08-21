const KEYS = [
  {
  padId: 'clear',
  unicode: '\u0043',
  digit: undefined
}, {
  padId: 'divide',
  unicode: '\u002F',
  digit: 'operator'
}, {
  padId: 'multiply',
  unicode: '\u002A',
  digit: 'operator'
}, {
  padId: 'subtract',
  unicode: '\u002D',
  digit: 'operator'
}, {
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
  padId: 'add',
  unicode: '\u002B',
  digit: 'operator'
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
  padId: 'equals',
  unicode: '\u003D',
  digit: undefined
}, {
  padId: 'zero',
  unicode: '\u0030',
  digit: 0
}, {
  padId: 'decimal',
  unicode: '\u002E',
  digit: undefined
}];
const NUMBERS = ['\u0037', '\u0038', '\u0039', '\u0034', '\u0035', '\u0036', '\u0031', '\u0032', '\u0033'];
const OPERATORS = ['\u002F', '\u002A', '\u002D', '\u002B'];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      archive: [],
      expression: [],
      portion: ''
    }
    this.liftData = this.liftData.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleNumders = this.handleNumders.bind(this);
    this.handleZero = this.handleZero.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);    
  }
  liftData(value) {
    value.padId === 'clear' ? this.handleClear() : 
      value.digit === 'operator' ? this.handleOperators(value) : 
      value.padId === 'zero' ? this.handleZero(value) : 
      value.padId === 'equals' ? this.handleResult() : 
      value.padId === 'decimal' ? this.handleDecimal() : 
      this.handleNumders(value);
  }
  handleClear() {
    this.setState({
      archive: [],
      expression: [],
      portion: ''
    });
  }
  handleOperators(value) {    
    const expr = this.state.expression;
    const port = this.state.portion;
    this.props.operators.includes(port) ? 
      this.setState({expression: expr.slice(0, expr.length-1).concat(value.unicode), portion: value.unicode}) : 
      this.setState({expression: [...expr, port, value.unicode], portion: value.unicode});
  }
  handleNumders(value) {
    this.state.archive.length !== 0 && this.state.expression.length === 0 ? 
      this.setState({portion: value.unicode}) :
      this.props.operators.includes(this.state.portion) ? 
      this.setState({portion: value.unicode}) :
      this.state.portion === '\u0030' ? 
      this.setState({portion: value.unicode}) :
      this.setState({portion: this.state.portion + value.unicode});
  }
  handleZero(value) {    
    if (this.state.portion !== '\u0030') {
      this.handleNumders(value);
    }
  }
  handleDecimal() {
    if (!this.state.portion.includes('\u002E')) {
      this.state.portion === '' || this.state.portion === '\u0030' ? 
      this.setState({portion: '\u0030' + '\u002E'}) : 
      this.props.operators.includes(this.state.portion) ? 
      this.setState({portion: '\u0030' + '\u002E'}) :
      this.setState({portion: this.state.portion + '\u002E'});
    }
  }
  handleResult() {
    let port = this.state.portion;
    let expr = this.state.expression;
    const toEval = [...expr, port].join('');    
    
    const result = Math.round(eval(toEval) * 1000000000)/1000000000;
    this.setState({
      archive: [...expr, port, '\u003D', result],
      expression: [],
      portion: result
    });    
  }
  render() {
    const arrToRender = this.props.keys.map(x => 
      <Pad padId={x.padId} unicode={x.unicode} digit={x.digit} liftData={this.liftData} />)
    return(
      <div id="calc">
        <Display expression={this.state.expression} portion={this.state.portion} archive={this.state.archive} />        
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
    this.props.liftData(value);
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
      <i>{/*{props.archive}*/}</i>
      <br />
      <span>{props.expression.length !== 0 ? props.expression : props.archive}</span>
      <br />
      {!props.portion ? '0' : props.portion}
    </div>
  );
}
ReactDOM.render(<App keys={KEYS} numbers={NUMBERS} operators={OPERATORS} />, 
  document.getElementById('root'));
