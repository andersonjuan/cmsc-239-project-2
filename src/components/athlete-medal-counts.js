import React, {Component} from 'react';
import {XYPlot,
          XAxis,
          YAxis,
          HorizontalGridLines,
          VerticalGridLines,
          MarkSeries,
          Hint} from 'react-vis';

import {min, max} from 'd3-array';

import {capitalizeFirstLetter, getStats, getRandomInt} from './../utils.js';

/*
 *  data = list of dictionaries with the necessary information to render the data.
 *  dim = {width, height}
 *  options = [list of filter keys] - first key is the key to access the array of data
 */
 /*
  * The graph below is organized as follows:
  * Age, height, weight
  *  change summary stat
  *  by country
*/
export default class AthleteMedalCounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sport: Object.keys(this.props.data)[getRandomInt(Object.keys(this.props.data).length)],
      keyOfInterest: this.props.options[0],
      legalSports: Object.keys(this.props.data),
      yDomain: getYdomain(this.props.data),
      xDomain: getXdomain(this.props.data)
    };

    this.handleSportChange = this.handleSportChange.bind(this);
    this.handleKOFchange = this.handleKOFchange.bind(this);
  }

  handleSportChange(event) {
    // event.persist();
    // this.setState((state) => {
    //   let newQuerry = event.target.value;
    //   newQuerry = capitalizeFirstLetter(newQuerry);
    //   if (this.state.legalSports.includes(newQuerry)) {
    //     state.sport = newQuerry;
    //   }
    //   return state;
    // });
    let newQuerry = event.target.value;
    newQuerry = capitalizeFirstLetter(newQuerry);
    if (this.state.legalSports.includes(newQuerry)) {
      this.setState({sport: newQuerry});
    }
  }

  handleKOFchange(newQuerry, e) {
    this.setState({keyOfInterest: newQuerry});
  }

  render() {
    const dataRender = dictToarray(this.props.data[this.state.sport]);
    return (
      <div className="graph">
        <XYPlot
          animation
          width={this.props.dim.width}
          height={this.props.dim.height}
          yDomain={this.state.yDomain}
          xDomain={this.state.xDomain}
          getX={d => {
            if (isNaN(d.key)) {
              return 0;
            }
            return d.key;
          }}
          getY={d => {
            if (d[this.state.keyOfInterest] === undefined) {
              return 0;
            }
            return d[this.state.keyOfInterest]; }}
            className="graph">
          <VerticalGridLines style={{stroke: "#474646"}}/>
          <HorizontalGridLines style={{stroke: "#474646"}}/>
          <XAxis title="Age in Years" tickFormat={(v, i) => setYears(v)} style={{stroke: "#474646"}}/>
          <YAxis title="Number of Medals Won" style={{stroke: "#474646"}}/>
          <MarkSeries
            className="Graph 4"
            cx={d => {
              if (isNaN(d.key)) {
                return 0;
              }
              return d.key;
            }}
            cy={d => {
              if (d[this.state.keyOfInterest] === undefined) {
                return 0;
              }
              return d[this.state.keyOfInterest]; }
            }
            size={3}
            data={dataRender}/>
        </XYPlot>
        <div>
          <form>
            <label> Sports:
              <select value={this.state.sport} onChange={this.handleSportChange}>
              {this.state.legalSports.sort().map(d => {
                   return (<option key={d} value={d}>{d}</option>);
               })}
              </select>
            </label>
          </form>
        </div>
        {(this.props.options).length > 1 &&
          this.props.options.map(opt => {
            return (<button key={opt} onClick={this.handleKOFchange.bind(this, opt)}>
              {capitalizeFirstLetter(opt)}
            </button>);
          })
        }
      </div>
    );
  }
}

// converts the given axis into years to display
function setYears(data, i) {
  return data.toString();
}

function dictToarray(data) {
  return Object.keys(data).map(d => {
    const v = data[d].total;
    v.key = d;
    return v;
  });
}

function getXdomain(data) {
  const results = Object.keys(data).reduce((accum, sport) => {
    const ages = Object.keys(data[sport]);
    accum.min = Math.min(accum.min, (min(ages, d => Number(d))));
    accum.max = Math.max(accum.max, (max(ages, d => Number(d))));
    return accum;
  }, {min: Infinity, max: -Infinity});
  return [results.min, results.max];
}

function getYdomain(data) {
  const results = Object.keys(data).reduce((accum, sport) => {
    const local = Object.keys(data[sport]).reduce((accumLocal, age) => {

      accumLocal.min = Math.min(accumLocal.min,
                                  ...grabValues(data[sport][age].winter, 'NA'),
                                  ...grabValues(data[sport][age].total, 'NA'),
                                  ...grabValues(data[sport][age].summer, 'NA'));
      accumLocal.max = Math.max(accumLocal.max,
                                  ...grabValues(data[sport][age].winter, 'NA'),
                                  ...grabValues(data[sport][age].total, 'NA'),
                                  ...grabValues(data[sport][age].summer, 'NA'));
      return accumLocal;
    }, {min: Infinity, max: -Infinity})
    accum.min = Math.min(accum.min, local.min);
    accum.max = Math.max(accum.max, local.max);
    // console.log(data[sport], sport, accum);
    return accum;
  }, {min: Infinity, max: -Infinity});
  // console.log(results);
  return [results.min, results.max];
}

function grabValues(data, keyToIgnore) {
  return Object.keys(data).reduce((accum, key) => {
    if (key !== keyToIgnore) {
      accum.push(data[key])
    }
    return accum;
  }, [])
}
