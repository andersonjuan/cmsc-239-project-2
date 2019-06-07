  jimport React, {Component} from 'react';

import {RadialChart, Hint} from 'react-vis';

function groupBy(data, key) {
  return data.reduce((acc, row) => {
    if (!acc[row[key]]) {
      acc[row[key]] = [];
    }
    acc[row[key]].push(row);
    return acc;
  }, {});
}

export default class ExampleChart extends Component {
  constructor() {
    super();
    this.state = {
      value: false,
      keyOfInterest: 'animal'
    };
  }

  render() {
    const {value, keyOfInterest} = this.state;
    const {data} = this.props;
    const preppedData = Object.entries(groupBy(data, keyOfInterest)).map(([key, values]) => {
      return {key, size: values.length};
    });
    return (
      <div>
        <RadialChart
          animation
          innerRadius={100}
          radius={140}
          getAngle={d => d.size}
          data={preppedData}
          onValueMouseOver={v => this.setState({hintValue: v})}
          onSeriesMouseOut={v => this.setState({hintValue: false})}
          width={300}
          height={300}
          padAngle={0.04}
        >
          {this.state.hintValue !== false &&
            <Hint value={v}>
              <div style={{background: 'black'}}>
                <h3>Stats</h3>
                <p>Min:{v.else.min}</p>
                <p>Max:{v.else.max}</p>
                <p>Median:{v.else.median}</p>
                <p>First Quantile:{v.else.firstQ}</p>
                <p>Third Quantile:{v.else.ThirdQ}</p>
              </div>
            </Hint>}
        </RadialChart>
        {Object.keys(data[0]).map(key => {
          return (<button
            key={key}
            onClick={() => this.setState({keyOfInterest: key})}
            >{key}</button>);
        })}
      </div>
    );
  }
}
