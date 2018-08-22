const KEYS = [{
  padId: 'clear',
  unicode: '\u0043',
  pad: undefined
}, {
  padId: 'divide',
  unicode: '\u002F',
  pad: '\u00F7'
}, {
  padId: 'multiply',
  unicode: '\u002A',
  pad: '\u00D7'
}, {
  padId: 'subtract',
  unicode: '\u002D',
  pad: '\u2212'
}, {
  padId: 'seven',
  unicode: '\u0037',
  pad: undefined
}, {
  padId: 'eight',
  unicode: '\u0038',
  pad: undefined
}, {
  padId: 'nine',
  unicode: '\u0039',
  pad: undefined
}, {
  padId: 'add',
  unicode: '\u002B',
  pad: '\uFF0B'
}, {
  padId: 'four',
  unicode: '\u0034',
  pad: undefined
}, {
  padId: 'five',
  unicode: '\u0035',
  pad: undefined
}, {
  padId: 'six',
  unicode: '\u0036',
  pad: undefined
}, {
  padId: 'one',
  unicode: '\u0031',
  pad: undefined
}, {
  padId: 'two',
  unicode: '\u0032',
  pad: undefined
}, {
  padId: 'three',
  unicode: '\u0033',
  pad: undefined
}, {
  padId: 'equals',
  unicode: '\u003D',
  pad: '\uFF1D'
}, {
  padId: 'zero',
  unicode: '\u0030',
  pad: '\uFF10'
}, {
  padId: 'decimal',
  unicode: '\u002E',
  pad: undefined
}];
const NUMBERS = ['\u0037', '\u0038', '\u0039', '\u0034', '\u0035', '\u0036', '\u0031', '\u0032', '\u0033'];
const OPERATORS = ['\u002F', '\u002A', '\u002D', '\u002B'];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newCalc: false,
      error: '',
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
      this.props.operators.includes(value.unicode) ? this.handleOperators(value) : 
      value.padId === 'zero' ? this.handleZero(value) : 
      value.padId === 'equals' ? this.handleResult() : 
      value.padId === 'decimal' ? this.handleDecimal() : 
      this.handleNumders(value);
  }
  handleClear() {
    this.setState({
      newCalc: false,
      error: '',
      archive: [],
      expression: [],
      portion: ''
    });
  }
  handleOperators(value) {
    this.setState ({newCalc: false});
    const expr = this.state.expression;
    const port = this.state.portion;
    this.props.operators.includes(port) ? 
      this.setState({expression: expr.slice(0, expr.length-1).concat(value.unicode), portion: value.unicode}) : 
      this.setState({expression: [...expr, value.unicode], portion: value.unicode});
  }
  handleNumders(value) {
    this.state.newCalc === true ? 
      this.setState({
        newCalc: false,
        error: '',
        archive: [],
        expression: [],
        portion: ''
      }, () => this.handleNumders(value)) :    
    this.state.portion === '\u0030' ? 
    this.setState({
      portion: value.unicode,
      expression: this.state.expression.slice(0, this.state.expression.length-1).concat([value.unicode])
    }) : 
    this.props.operators.includes(this.state.portion) ? 
    this.setState({
      portion: value.unicode,
      expression: [...this.state.expression, value.unicode]
    }) :
    this.setState({
      portion: this.state.portion + value.unicode, 
      expression: [...this.state.expression, value.unicode]
    });
  }
  handleZero(value) {
    this.state.newCalc === true ? 
    this.setState({
      newCalc: false,
      error: '',
      archive: [],
      expression: [],
      portion: ''
    }, () => this.handleZero(value)) : 
    this.state.portion !== '\u0030' ?
    this.handleNumders(value) : null        //Do Noyhing
  }
  handleDecimal() {
    this.state.newCalc === true ? 
    this.setState({
      newCalc: false,
      error: '',
      archive: [],
      expression: [],
      portion: ''
    }, () => this.handleDecimal()) : 
    this.state.portion.includes('\u002E') ? 
    null : //Do Noyhing
    this.state.portion === '' || this.props.operators.includes(this.state.portion) ? 
    this.setState({
      portion: '\u0030' + '\u002E',
      expression: [...this.state.expression, '\u0030' + '\u002E']
    }) : 
    this.state.portion === '\u0030' ? 
    this.setState({
      portion: '\u0030' + '\u002E',
      expression: [...this.state.expression, '\u002E']
    }) : 
    this.setState({
      portion: this.state.portion + '\u002E',
      expression: [...this.state.expression, '\u002E']
    });
  }
  handleResult() {
    this.setState({newCalc: true});
    let toEval = '';
    let port = this.state.portion;
    let expr = this.state.expression;
    if (this.props.operators.includes(expr[expr.length-1])) {
      expr = expr.slice(0, expr.length-1);
    }
    if (expr.length !== 0) {
      if (expr[0] === '\u002A' || expr[0] === '\u002F') {
        this.setState({
          archive: [...expr],
          expression: [],
          portion: '',
          error: 'Malformed expression'
        });
      } else {
        toEval = expr.join('');    
        const result = Math.round(eval(toEval) * 1000000000)/1000000000;
        this.setState({
          archive: [...expr, '\u003D', result.toString()],
          expression: [result.toString()],
          portion: result.toString()
        });
      }
    }
  }
  render() {
    const archive = this.state.archive.map(x => 
      x.replace(/\u002F/g, '\u00F7').replace(/\u002A/g, '\u00D7'));
    const expression = this.state.expression.map(x => 
      x.replace(/\u002F/g, '\u00F7').replace(/\u002A/g, '\u00D7'));
    const portion = this.state.portion.replace(/\u002F/g, '\u00F7').replace(/\u002A/g, '\u00D7');
    const arrToRender = this.props.keys.map(x => 
      <Pad padId={x.padId} unicode={x.unicode} liftData={this.liftData} pad={x.pad} />)
    return(
      <div id="calc">
        <Display expression={expression} portion={portion} archive={archive} 
          error={this.state.error} newCalc={this.state.newCalc} />        
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
      unicode: this.props.unicode
    };
    this.props.liftData(value);
  }
  render() {
    return(
      <div id={this.props.padId} className="pads" onClick={this.handleClick}>
        {this.props.pad ? this.props.pad : this.props.unicode}
      </div>
    );
  }
}
const Display = (props) => {
  return (
    <div id="display" >
      <span>{props.newCalc ?  props.archive : props.expression}</span>
      <br />
      {props.portion ? props.portion : '0'}
      <br />
      <i>{props.error}</i>
    </div>
  );
}
ReactDOM.render(<App keys={KEYS} numbers={NUMBERS} operators={OPERATORS} />, 
  document.getElementById('root'));
