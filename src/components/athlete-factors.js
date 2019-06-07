import React, {Component} from 'react';
import {LineSeries, XYPlot,
          XAxis,
          YAxis,
          HorizontalGridLines,
          VerticalGridLines,
          Hint} from 'react-vis';

import {min, max} from 'd3-array';
import {scaleLinear} from 'd3-scale'
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
      xDomain: this.props.xDomain
    };

    this.handleSportChange = this.handleSportChange.bind(this);
    this.handleKOFchange = this.handleKOFchange.bind(this);
  }

  handleSportChange(event) {
    event.persist();
    this.setState((state) => {
      let newQuerry = event.target.value;
      newQuerry = capitalizeFirstLetter(newQuerry);
      if (this.state.legalSports.includes(newQuerry)) {
        state.sport = newQuerry;
      }
      return state;
    });
  }

  handleKOFchange(newQuerry, e) {
    this.setState((state) => {
      state.keyOfInterest = newQuerry;
      return state;
    });
  }

  render() {
    const formattedData = convertData(this.props.data, this.state.sport, this.state.keyOfInterest);
    const yDomain = getYdomain(this.props.data, this.state.sport, this.state.keyOfInterest);

    const distance = Math.abs(formattedData[1].year - formattedData[0].year) * 0.2;
    const xScale = scaleLinear().domain(this.state.xDomain).range([0,420]);
    const yScale = scaleLinear().domain(yDomain).range([0,420]);
    return (
      <div>
        <div className="chart">
         <XYPlot
            xDomain={this.state.xDomain}
            yDomain={yDomain}
            height={this.props.dim.height}
            width={this.props.dim.width}>
           <XAxis />
           <YAxis />
           <HorizontalGridLines />
           <VerticalGridLines />
           <g
             transform={`translate(40,40)`}
           >
            {formattedData.map((d, i) => {
              console.log(d.year);
              console.log(i);
              console.log(d.thirdQ);
              console.log(Math.abs(d.thirdQ - d.firstQ));
              return (
                <rect
                  key={i}
                  x={xScale(d.year)}
                  width={yScale(distance * 4)}
                  y={d.thirdQ}
                  height={Math.abs(yScale(d.thirdQ) - yScale(d.firstQ))}
                  fill={"black"} />);})
            }
           </g>
         </XYPlot>
       </div>
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

  console.log([results.min, results.max]);
  return [results.min, results.max];
}

function quartile(array, percent) {
  return array[Math.round(array.length * percent)];
}

function convertData(data, sport, factor) {
  console.log(data[sport][factor])
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

//
// function renderBoxes(data) {
//     const distance = Math.abs(data[1].year - data[0].year) * 0.2;
//     console.log(distance);
//     return (
//         data.map((d, i) => {
//           return (
//             <g
//               transform={`translate(${d.year})`}
//               key={i}
//             >
//               <rect
//                 x={0}
//                 width={Math.max(distance * 4, 0)}
//                 y={d.thirdQ}
//                 height={Math.abs(d.thirdQ - d.firstQ)}
//                 fill={"black"}
//               />
//             </g>
//           );
//         })
//     );
// }
