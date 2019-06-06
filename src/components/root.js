import React from 'react';
import {csv} from 'd3-fetch';
import ExampleChart from './example-chart';
import ButtonFilterChart from './general-chart';

import {categorizeBy, grabBy, getStats, getCatRange, countBy} from './../utils.js'

const longBlock = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

class RootComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      loading: true
    };
  }

  componentWillMount() {
    csv('data/athlete_events.csv')
      .then(data => {
        this.setState({
          data,
          loading: false
        });
      });
  }

  render() {
    const {loading, data} = this.state;
    const dimension = {height:1000, width:1000};
    const cat = ["Total", "Gold", "Silver", "Bronze"];

    if (loading) {
      return <h1>LOADING</h1>;
    }

    const cleanedData = data.filter(d => (Number(d.Year) >= 2016));
    let medalsData = categorizeBy(cleanedData, "NOC", "Year");

    medalsData = Object.keys(medalsData).reduce((accumFinal, country) => {
      const countryData = medalsData[country];

      accumFinal[country] = Object.keys(countryData).reduce((accum, year) => {
          accum[year] = {total: countBy(countryData[year], 'Medal'),
                         winter: countBy(countryData[year].filter(d => d.Season === "Winter"), 'Medal'),
                         summer: countBy(countryData[year].filter(d => d.Season === "Summer"), 'Medal')};
          return accum;
      }, {});

      return accumFinal;
    }, {});

    console.log(medalsData);

    return (
      <div className="relative">
        <h1> Hello Explainable!</h1>
        <div>{`The example data was loaded! There are ${medalsData.length} rows`}</div>
        <ButtonFilterChart data={medalsData} options={cat} dim={dimension} />
      </div>
    );
  }
}

RootComponent.displayName = 'RootComponent';
export default RootComponent;
