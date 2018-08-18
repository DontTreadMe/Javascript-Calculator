const keys = [{
  unicode: "\u0037",
  value: 7
}, {
  unicode: "\u0038",
  value: 8
}, {
  unicode: "\u0039",
  value: 9
}, {
  unicode: "\u00F7",
  value: ''
}, {
  unicode: "\u0043",
  value: ''
}, {
  unicode: "\u0034",
  value: 4
}, {
  unicode: "\u0035",
  value: 5
}, {
  unicode: "\u0036",
  value: 6
}, {
  unicode: "\u00D7",
  value: ''
}, {
  unicode: "\u0028",
  value: ''
}, {
  unicode: "\u0029",
  value: ''
}, {
  unicode: "\u0031",
  value: 1
}, {
  unicode: "\u0032",
  value: 2
}, {
  unicode: "\u0033",
  value: 3
}, {
  unicode: "\u2212",
  value: ''
}, {
  unicode: "x\u00B2",
  value: ''
}, {
  unicode: "\u221A",
  value: ''
}, {
  unicode: "\u0030",
  value: 0
}, {
  unicode: "\u22C5",
  value: ''
}, {
  unicode: "\u0025",
  value: ''
}, {
  unicode: "\u002B",
  value: ''
}, {
  unicode: "\u003D",
  value: ''
}];


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: ''
    }
    //this.handleKeyDown = this.handleKeyDown.bind(this);
  }
 handleClick() {
   
 }
  render() {
    const arrToRender = keys.map(x => 
      <Pad unicode={x.unicode} />)
    return(
      <div>
        {arrToRender}
      </div>
    );
  }
}

const Pad = (props) => {
  return(
    <div id={props.unicode}>
      {props.unicode}
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));
