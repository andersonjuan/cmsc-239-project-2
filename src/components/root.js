import React from 'react';
import {csv} from 'd3-fetch';
import ExampleChart from './example-chart';
import ButtonFilterChart from './general-chart';
import {Intro, Conclusion, Para1, Para2, Para3, Para4, Para5} from '../text.js';
import AthleteMedalCounts from './athlete-medal-counts';

import {categorizeBy, grabBy, getStats, getCatRange, countBy} from './../utils.js'

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
    const dimension = {height:500, width:500};
    const cat = ['Gold', 'Silver', 'Bronze'];
    const athletecat = ['Weight', 'Height', 'Age'];
    if (loading) {
      return <h1>LOADING</h1>;
    }
    const cleanedData = data.filter(d => (Number(d.Year) >= 1970));
    console.log('Cleaned Data');
    console.log(cleanedData);
    let medalsData = categorizeBy(cleanedData, 'NOC', 'Year');
    let athleteMedals = categorizeBy(cleanedData, 'Sport', 'Age');
    console.log(athleteMedals);
    medalsData = Object.keys(medalsData).reduce((accumFinal, country) => {
      const countryData = medalsData[country];
      accumFinal[country] = Object.keys(countryData).reduce((accum, year) => {
        accum[year] = {total: countBy(countryData[year], 'Medal'),
          winter: countBy(countryData[year].filter(d => d.Season === 'Winter'), 'Medal'),
          summer: countBy(countryData[year].filter(d => d.Season === 'Summer'), 'Medal')};
        return accum;
      }, {});
      return accumFinal;
    }, {});

    athleteMedals = Object.keys(athleteMedals).reduce((accumFinal, sport) => {
      const sportData = athleteMedals[sport];
      accumFinal[sport] = Object.keys(sportData).reduce((accum, age) => {
        accum[age] = {total: countBy(sportData[age], 'Medal'),
          winter: countBy(sportData[age].filter(d => d.Season === 'Winter'), 'Medal'),
          summer: countBy(sportData[age].filter(d => d.Season === 'Summer'), 'Medal')};
        return accum;
      }, {});
      return accumFinal;
    }, {});

    console.log(athleteMedals);
    return (
      <div className="relative">
        <h1> All the Glitter is not Gold</h1>
        <Intro />
        <div>{`The example data was loaded! There are ${medalsData.length} rows`}</div>
        <Para1 />
        <ButtonFilterChart data={medalsData} options={cat} dim={dimension} />
        <Para2 />
        <Para3 />
        <AthleteMedalCounts data={athleteMedals} options={cat} dim={dimension} />
        <Para4 />
        <Para5 />
        <Conclusion />
      </div>
    );
  }
}

RootComponent.displayName = 'RootComponent';
export default RootComponent;
