const keys = [{
  padId: 'seven',
  unicode: "\u0037",
  value: 7
}, {
  padId: 'eight',
  unicode: "\u0038",
  value: 8
}, {
  padId: 'nine',
  unicode: "\u0039",
  value: 9
}, {
  padId: 'div  padIde',
  unicode: "\u00F7",
  value: ''
}, {
  padId: 'undo',
  unicode: "\u21B6",
  value: ''
}, {
  padId: 'clear',
  unicode: "\u0043",
  value: ''
}, {
  padId: 'four',
  unicode: "\u0034",
  value: 4
}, {
  padId: 'five',
  unicode: "\u0035",
  value: 5
}, {
  padId: 'six',
  unicode: "\u0036",
  value: 6
}, {
  padId: 'multiply',
  unicode: "\u00D7",
  value: ''
}, {
  padId: '',
  unicode: "\u0028",
  value: ''
}, {
  padId: '',
  unicode: "\u0029",
  value: ''
}, {
  padId: 'one',
  unicode: "\u0031",
  value: 1
}, {
  padId: 'two',
  unicode: "\u0032",
  value: 2
}, {
  padId: 'three',
  unicode: "\u0033",
  value: 3
}, {
  padId: 'subtract',
  unicode: "\u2212",
  value: ''
}, {
  padId: '',
  unicode: "x\u00B2",
  value: ''
}, {
  padId: '',
  unicode: "\u221A",
  value: ''
}, {
  padId: 'zero',
  unicode: "\u0030",
  value: 0
}, {
  padId: 'decimal',
  unicode: "\u002E",
  value: ''
}, {
  padId: '',
  unicode: "\u0025",
  value: ''
}, {
  padId: 'add',
  unicode: "\u002B",
  value: ''
}, {
  padId: 'equals',
  unicode: "\u003D",
  value: ''
}];


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }
 handleClick() {
   
 }
  render() {
    const arrToRender = keys.map(x => 
      <Pad padId={x.padId} unicode={x.unicode} />)
    return(
      <div id="calc">
        <Display />
        
          {arrToRender}
        
      </div>
    );
  }
}

const Pad = (props) => {
  return(
    <div id={props.padId} className="pads">
      {props.unicode}
    </div>
  );
}

const Display = (props) => {
  return (
    <div id="display">
      7894561230
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));
