import React, {Component} from 'react';
import {XYPlot,
          XAxis,
          YAxis,
          HorizontalGridLines,
          VerticalGridLines,
          MarkSeries, DiscreteColorLegend} from 'react-vis';

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
export default class SportsCountryChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noc: Object.keys(this.props.data)[getRandomInt(Object.keys(this.props.data).length)],
      keyOfInterest: this.props.options[0],
      legalNocs: Object.keys(this.props.data),
      xDomain: getXdomain(this.props.data)
      };

    this.handlNOCChange = this.handlNOCChange.bind(this);
    this.handleKOFchange = this.handleKOFchange.bind(this);
  }

  handlNOCChange(event) {
    event.persist();
    this.setState((state) => {
      const newQuerry = event.target.value.toUpperCase();
      if (this.state.legalNocs.includes(newQuerry)) {
        state.noc = newQuerry;
      }
      return state;
    });
  }

  handleKOFchange(newQuerry, e) {
    this.setState((state) => {
      if (newQuerry === "All") {
        newQuerry = "Total";
      }

      state.keyOfInterest = newQuerry;
      return state;
    });
  }

  render() {
    const dataRender = convertSportSeries(this.props.data[this.state.noc]);
    return (
      <div>
        <XYPlot
          width={this.props.dim.width}
          height={this.props.dim.height}
          xDomain={this.state.xDomain}
          getX={d => d.year}
          getY={d => {
            if (d[this.state.keyOfInterest] === undefined) {
              return 0;
            }
            return d[this.state.keyOfInterest]}}
          colorType="category"
          className="graph">

          <VerticalGridLines style={{stroke: "#474646"}}/>
          <HorizontalGridLines style={{stroke: "#474646"}}/>
          <XAxis title="Year" tickFormat={(v, i) => setYears(v)} style={{stroke: "#474646"}}/>
          <YAxis title="Number of Medals Won" style={{stroke: "#474646"}}/>
          <DiscreteColorLegend
            width={500}
            height={50}
            startTitle={"Legend"}
            items={(Object.keys(dataRender).sort())}
            orientation="horizontal"
            layout="vetical" verticalAlign="middle" align="right"/>
          {(Object.keys(dataRender).sort()).map((sport) => {
              return (<MarkSeries
                className={`Graph2-{sport}`}
                key={sport}
                cx={d => d.year}
                cy={d => {
                  if (d[this.state.keyOfInterest] === undefined) {
                    return 0;
                  }
                  return d[this.state.keyOfInterest]}
                }
                data={dataRender[sport]}
                size={2}/>);
            })}
        </XYPlot>
        <div>
          <form>
            <label> NOCs:
              <select value={this.state.noc} onChange={this.handlNOCChange}>
              {this.state.legalNocs.sort().map(d => {
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

function convertSportSeries(data) {
  let cleaned = Object.keys(data).reduce((accum, year) => {
    Object.keys(data[year]).forEach(sport => {
      if (accum[sport] === undefined) {
        accum[sport] = []
      }
      const newYear = {... data[year][sport]};
      newYear.year = year;
      accum[sport].push(newYear);
    });
    return accum;
  }, {});

  let filtered = Object.keys(cleaned).reduce((accum, d) => {
    let temp = {sport: d, length: cleaned[d].length}
    temp.tot = cleaned[d].reduce((count, el) => count + el.total, 0);
    accum.push(temp);
    return accum;
  }, []);
  filtered = filtered.sort((sport1, sport2) => sport2.tot - sport1.tot).slice(0, 10);

  return filtered.reduce((accum, d) => {
    accum[d.sport] = cleaned[d.sport];
    return accum;
  }, {});
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

function grabValues(data, keyToIgnore) {
  return Object.keys(data).reduce((accum, key) => {
    if (key !== keyToIgnore) {
      accum.push(data[key])
    }
    return accum;
  }, [])
}
