import React, {Component} from 'react';
import {LineSeries, XYPlot,
          XAxis,
          YAxis,
          HorizontalGridLines,
          VerticalGridLines,
          Hint, VerticalBarSeries, HorizontalRectSeries} from 'react-vis';

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
export default class AthleteFactors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sport: Object.keys(this.props.data)[getRandomInt(Object.keys(this.props.data).length)],
      keyOfInterest: this.props.options[0],
      legalSports: Object.keys(this.props.data),
      xDomain: this.props.xDomain,
      hintValue: false,
    };

    this.handleSportChange = this.handleSportChange.bind(this);
    this.handleKOFchange = this.handleKOFchange.bind(this);
  }

  handleSportChange(event) {
    console.log(event, event.target.value)
    let newQuerry = event.target.value;
    newQuerry = capitalizeFirstLetter(newQuerry);
    if (this.state.legalSports.includes(newQuerry)) {
      this.setState({sport: newQuerry})
    }
  }

  handleKOFchange(newQuerry, e) {
    this.setState({keyOfInterest: newQuerry});
  }

  render() {
    const yDomain = getYdomain(this.props.data, this.state.sport, this.state.keyOfInterest);
    const formattedData = convertData(this.props.data, this.state.sport, this.state.keyOfInterest);
    const value = this.state.hintValue;
    // console.log(this.state.legalSports)
    return (
      <div>
        <div className="chart">
         <XYPlot
            xDomain={this.state.xDomain}
            yDomain={yDomain}
            height={this.props.dim.height}
            width={this.props.dim.width}
            colorType="category"
            className="graph">
            <HorizontalGridLines style={{stroke: "#474646"}}/>
            <VerticalGridLines style={{stroke: "#474646"}}/>
           <XAxis title="Year" tickFormat={(v, i) => setYears(v)} style={{stroke: "#474646"}}/>
           <YAxis title={this.state.keyOfInterest} style={{stroke: "#474646"}}/>
           <HorizontalRectSeries
              onValueMouseOver={v => {console.log(v);this.setState({hintValue: v})}}
              onSeriesMouseOut={v => this.setState({hintValue: false})}
              data={formattedData.reduce((accum, d) => {
                accum.push({x: d.year+.1, x0: d.year-.1, y: d.min, y0: d.max, else: d})
                return accum;
              }, [])}/>
           <HorizontalRectSeries
              onValueMouseOver={v => {console.log(v);this.setState({hintValue: v})}}
              onSeriesMouseOut={v => this.setState({hintValue: false})}
              data={formattedData.reduce((accum, d) => {
                accum.push({x: d.year+0.9, x0: d.year-0.9, y: d.thirdQ, y0: d.firstQ, else: d})
                return accum;
              }, [])}/>
              {value !== false &&
                <Hint value ={value}>
                  <div style={{background: 'black'}}>
                    <h3>Stats</h3>
                    <p>Year:  {value.else.year}</p>
                    <p>Min:  {value.else.min}</p>
                    <p>Max:  {value.else.max}</p>
                    <p>Median:  {value.else.median}</p>
                    <p>First Quantile:  {value.else.firstQ}</p>
                    <p>Third Quantile:  {value.else.thirdQ}</p>
                  </div>
                </Hint>}
         </XYPlot>
       </div>
       <div>
         <form>
           <select value={this.state.sport} onChange={this.handleSportChange}>
           {this.state.legalSports.sort().map(d => {
                return (<option key={d} value={d}>
                          {capitalizeFirstLetter(d)}
                        </option>);
            })}
           </select>
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

function getYdomain(data, sport, factor) {
  let results = Object.keys(data[sport][factor]).reduce((accum, year) => {
    accum.min = Math.min(accum.min, ...removeNAN(data[sport][factor][year]));
    accum.max = Math.max(accum.max, ...removeNAN(data[sport][factor][year]));
    return accum;
  }, {min: Infinity, max: -Infinity});

  results.min = Math.min(results.min - 10, 0)
  results.max = results.max + 10

  return [results.min, results.max];
}

function quartile(array, percent) {
  return array[Math.round(array.length * percent)];
}

function convertData(data, sport, factor) {
  return Object.keys(data[sport][factor]).reduce((accum, yearData) => {
    const safe = removeNAN(data[sport][factor][yearData]).sort();
    const instance = {firstQ: quartile(safe, .25),
                        median: quartile(safe, .5),
                        thirdQ: quartile(safe, .75),
                        year: Number(yearData)};
    const others = safe.reduce((accum, d) => {
      accum.min  = (d < accum.min) ? d : accum.min;
      accum.max  = (d > accum.max) ? d : accum.max;
      accum.sum += d;
      accum.count++;
      return accum;
    }, {min: Infinity, max: -Infinity, sum: 0, count: 0});

    instance.min = others.min;
    instance.max = others.max;
    instance.mean = others.mean / others.count;
    accum.push(instance);
    return accum;
  }, []);
}

function removeNAN(array) {
  return array.filter(function (value) {
    return !Number.isNaN(value);
  });
}
