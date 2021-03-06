import React, {Component} from 'react';
import {XYPlot,
          XAxis,
          YAxis,
          HorizontalGridLines,
          VerticalGridLines,
          MarkSeries,
          Hint} from 'react-vis';

import {capitalizeFirstLetter, getStats, getRandomInt} from './../utils.js';

// may want to try the select tag to let user to select by country
/*
 *
 *  data = list of dictionaries with the necessary information to render the data.
 *  dim = {width, height}
 *  options = [list of filter keys] - first key is the key to access the array of data
 *
 *
 */
export default class ButtonFilterChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noc: Object.keys(this.props.data)[getRandomInt(Object.keys(this.props.data).length)],
      keyOfInterest: this.props.options[0],
      legalNocs: Object.keys(this.props.data),
      yDomain: getYdomain(this.props.data),
      xDomain: getXdomain(this.props.data),
      countries: this.props.countries,
      countriesReverse: reverseMap(this.props.countries)
    };

    this.handlNOCChange = this.handlNOCChange.bind(this);
    this.handleKOFchange = this.handleKOFchange.bind(this);
  }

  handlNOCChange(event) {
    const newQuerry = this.state.countries[event.target.value];
    if (this.state.legalNocs.includes(newQuerry)) {
      this.setState({noc: newQuerry});
    }
  }

  handleKOFchange(newQuerry, e) {
    this.setState({keyOfInterest: newQuerry});
  }

  render() {
    const dataRender = dictToarray(this.props.data[this.state.noc]);
    const plotWidth = this.props.dim.width;
    const plotHeight = this.props.dim.height;

    return (
      <div>
        <XYPlot
          title="Medals per Year"
          animation
          width={plotWidth}
          height={plotHeight}
          yDomain={this.state.yDomain}
          xDomain={this.state.xDomain}
          getX={d => d.key}
          getY={d => {
            if (d[this.state.keyOfInterest] === undefined) {
              return 0;
            }
            return d[this.state.keyOfInterest]}}
            className="graph">
          <VerticalGridLines style={{stroke: "#474646"}}/>
          <HorizontalGridLines style={{stroke: "#474646"}}/>
          <XAxis tickFormat={(v, i) => setYears(v)} title="Year" style={{stroke: "#474646"}}/>
          <YAxis title="Number of Medals Won" style={{stroke: "#474646"}}/>
          <MarkSeries
            className="Graph 1"
            cx={d => d.key}
            cy={d => {
              if (d[this.state.keyOfInterest] === undefined) {
                return 0;
              }
              return d[this.state.keyOfInterest]}
            }
            data={dataRender}/>
        </XYPlot>
        <div>
          <form>
            <label> NOCs:
              <select value={this.state.countriesReverse[this.state.noc]} onChange={this.handlNOCChange}>
              {Object.keys(this.state.countries).sort().map(d => {
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
  const results = Object.keys(data).reduce((accum, country) => {
    const dates = Object.keys(data[country])
    accum.min = Math.min(accum.min, ...dates);
    accum.max = Math.max(accum.max, ...dates);
    return accum;
  }, {min: Infinity, max: -Infinity});
  return [results.min, results.max];
}

function getYdomain(data) {
  const results = Object.keys(data).reduce((accum, country) => {
    const local = Object.keys(data[country]).reduce((accumLocal, year) => {

      accumLocal.min = Math.min(accumLocal.min,
                                  ...grabValues(data[country][year].winter, 'NA'),
                                  ...grabValues(data[country][year].total, 'NA'),
                                  ...grabValues(data[country][year].summer, 'NA'));
      accumLocal.max = Math.max(accumLocal.max,
                                  ...grabValues(data[country][year].winter, 'NA'),
                                  ...grabValues(data[country][year].total, 'NA'),
                                  ...grabValues(data[country][year].summer, 'NA'));
      return accumLocal;
    }, {min: Infinity, max: -Infinity})
    accum.min = Math.min(accum.min, local.min);
    accum.max = Math.max(accum.max, local.max);
    return accum;
  }, {min: Infinity, max: -Infinity});

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

function reverseMap(dict) {
  return Object.keys(dict).reduce((accum, d) => {
    accum[dict[d]] = d;
    return accum;
  }, {});
}
