import React, {Component} from 'react';
import {LineSeries, XYPlot,
          XAxis,
          YAxis,
          Hint, ParallelCoordinates} from 'react-vis';

import {min, max} from 'd3-array';
import {capitalizeFirstLetter, getStats, getRandomInt} from './../utils.js';

import {SPORTS} from './../constants.js';

export default class ParallelCoords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sport: Object.keys(this.props.data)[getRandomInt(Object.keys(this.props.data).length)],
      year: 2016,
      stat: this.props.options[0],
      legalSports: Object.keys(this.props.data),
      legalYears: this.props.years
    };

    this.handleSportChange = this.handleSportChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleStatchange = this.handleStatchange.bind(this);
  }

  handleSportChange(event) {
    let newQuerry = event.target.value;
    newQuerry = capitalizeFirstLetter(newQuerry);
    if (this.state.legalSports.includes(newQuerry)) {
        this.setState({sport: newQuerry});
    }
  }

  handleYearChange(event) {
    let newQuerry = Number(event.target.value);
    if (newQuerry >= this.state.legalYears[0] && newQuerry <= this.state.legalYears[1]) {
      this.setState({year: newQuerry});
    }
  }

  handleStatchange(stat, e) {
    this.setState({stat: stat});
  }

  render() {
    console.log(this.props.data,
                  this.state.year,
                  this.state.sport,
                  this.state.stat);
    const renderData = generateParaData(this.props.data,
                                          this.state.year,
                                          this.state.sport,
                                          this.state.stat);
    console.log(renderData)
    return (
      <div>
        <div className="chart">
          <ParallelCoordinates
           animation
           data={renderData.data}
           domains={renderData.domains}
           style={{
             lines: {
               strokeWidth: 1
             },
             axes: {
               text: {
                 opacity: 1
               }
             },
             labels: {
               textAnchor: 'right'
             }
           }}
           tickFormat={t => ''}
           width={this.props.dim.width}
           height={this.props.dim.height}
         />
       </div>
       <div>
         <form>
          <label> Sport:
           <input type="text" onChange={this.handleSportChange} />
          </label>
          <label> Year:
          <input type="text" onChange={this.handleYearChange} />
          </label>
         </form>
       </div>
       {(this.props.options).length > 1 &&
         this.props.options.map(opt => {
           return (<button key={opt} onClick={this.handleStatchange.bind(this, opt)}>
             {capitalizeFirstLetter(opt)}
           </button>);
         })
       }
      </div>
    );
  }
}

function generateParaData(data, year, sport, stat) {
  const domains = {Country:[],
                      Region: ["ANOCA", "PANAM", "OCA", "EOC", "ONOC", "Other"],
                      Age: [Infinity, -Infinity],
                      Height: [Infinity, -Infinity],
                      Weight: [Infinity, -Infinity],
                      Medals: [0,3]};

  const results = Object.keys(data).reduce((datapoints, country) => {
    if (data[country][year] !== undefined) {
      const countryYear = data[country][year].filter(d => {return d => d.Sport === sport;});

      if (countryYear.length != 0) {
        const datapt = {name: country, Country: country, Region: countryYear[0].region}
        const age = countryYear.reduce((acc, d) => {acc.push(Number(d.Age)); return acc;}, []).filter(d => !isNaN(d));
        const height = countryYear.reduce((acc, d) => {acc.push(Number(d.Height)); return acc;}, []).filter(d => !isNaN(d));
        const weight = countryYear.reduce((acc, d) => {acc.push(Number(d.Weight)); return acc;}, []).filter(d => !isNaN(d));

        if (age.length !== 0 && height.length !== 0  && weight.length !== 0) {

          if (datapt.Region === undefined) {
            datapt.Region = "Other";
          }

          if (datapt.Region === "ANOCA") {
            datapt.regionNum = 0;
          } else if (datapt.Region === "PANAM") {
            datapt.regionNum = 1;
          } else if (datapt.Region === "OCA") {
            datapt.regionNum = 2;
          } else if (datapt.Region === "EOC") {
            datapt.regionNum = 3;
          } else if (datapt.Region === "ONOC") {
            datapt.regionNum = 4;
          } else if (datapt.Region === "Other") {
            datapt.regionNum = 5;
          }

          if (stat === "Mean") {
            datapt.Age = Math.mean(...age);
            datapt.Height = Math.mean(...height);
            datapt.Weight = Math.mean(...weight);
          } else if (stat === "Max") {
            datapt.Age = Math.max(...age);
            datapt.Height = Math.max(...height);
            datapt.Weight = Math.max(...weight);
          } else if (stat === "Median") {
            const countryYearLength = countryYear.length
            datapt.Age = age.sort()[Math.floor(countryYearLength / 2)]
            datapt.Height = height.sort()[Math.floor(countryYearLength / 2)]
            datapt.Weight = weight.sort()[Math.floor(countryYearLength / 2)]
          } else if (stat === "Min") {
            datapt.Age = Math.min(...age);
            datapt.Height = Math.min(...height);
            datapt.Weight = Math.min(...weight);
          }

          datapt.Medals = countryYear.reduce((acc, d) => {
            if (d.Medal !== "NA") {
              return (acc +1);
            }
            return acc;
          }, 0);
          if (datapt.Height === Infinity) {
            datapt.Height = 0;
          }
          if (datapt.Weight === Infinity) {
            datapt.Weight = 0;
          }

          datapoints.push(datapt);

          domains.Country.push(datapt.NOC);
          domains.Age[0] = (domains.Age[0] > datapt.Age) ? datapt.Age : domains.Age[0];
          domains.Age[1] = (domains.Age[1] < datapt.Age) ? datapt.Age : domains.Age[1];

          domains.Height[0] = (domains.Height[0] > datapt.Height) ? datapt.Height : domains.Height[0];
          domains.Height[1] = (domains.Height[1] < datapt.Height) ? datapt.Height : domains.Height[1];

          domains.Weight[0] = (domains.Weight[0] > datapt.Weight) ? datapt.Weight : domains.Weight[0];
          domains.Weight[1] = (domains.Weight[1] < datapt.Weight) ? datapt.Weight : domains.Weight[1];
        }
      }
    }
    return datapoints;
  }, []);
  return {data: results,
            domains: [{name: 'Region', domain: [0,domains.Region.length-1], getValue: d => d.regionNum},
                        {name: 'Age', domain: domains.Age, getValue: d => d.Age},
                        {name: 'Height', domain: domains.Height, getValue: d => d.Height},
                        {name: 'Weight', domain: domains.Weight, getValue: d => d.Weight},
                        {name: 'Medals', domain: domains.Medals, getValue: d => d.Medals}
                      ]};
}
