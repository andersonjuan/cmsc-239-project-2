import React from 'react';
import {csv} from 'd3-fetch';
import ButtonFilterChart from './general-chart';
import SportsCountryChart from './sportsCountryChart';
import {Intro, Conclusion, Para1, Para2, Para3, Para4, Para5} from '../text.js';
import AthleteMedalCounts from './athlete-medal-counts';
import AthleteFactors from './athlete-factors';

import {categorizeBy,
          grabBy,
          getStats,
          getCatRange,
          countBy,
          createEmptySportsDict} from './../utils.js'

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
    const medals = ['Gold', 'Silver', 'Bronze'];
    const athletecat = ['Weight', 'Height', 'Age'];
    if (loading) {
      return <h1>LOADING</h1>;
    }
    const cleanedData = data.filter(d => (Number(d.Year) >= 1970));
    // console.log('Cleaned Data');
    // console.log(cleanedData);
    let medalsData = categorizeBy(cleanedData, 'NOC', 'Year');
    let athleteMedals = categorizeBy(cleanedData, 'Sport', 'Age');
    // console.log(athleteMedals);
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

    const sportsData = createSportsDataset(cleanedData, 1970);
    // console.log(athleteMedals);
    console.log(medalsData, medals, dimension)
    return (
      <div className="relative">
        <h1> All the Glitter is not Gold</h1>
        <Intro />
        <div>{`The example data was loaded! There are ${medalsData.length} rows`}</div>
        <Para1 />
        <ButtonFilterChart data={medalsData} options={medals} dim={dimension} />
        <Para2 />
        <Para3 />
        <AthleteMedalCounts data={athleteMedals} options={medals} dim={dimension} />
        <Para4 />
        <Para5 />
        <Conclusion />
      </div>
    );
  }
}

function createSportsDataset(cleanedData, year) {
  let sportsData = categorizeBy(cleanedData, 'NOC', 'Year')
  sportsData = Object.keys(sportsData).reduce((accumNOC, country) => {

    const countryData = sportsData[country];
    accumNOC[country] = Object.keys(countryData).reduce((accumYear, year) => {

      accumYear[year] = countryData[year].reduce((accumSport, element) => {
        if (accumSport[element.Sport] === undefined) {
          accumSport[element.Sport] = {total: 0};
        }
        if (accumSport[element.Sport][element.Medal] === undefined) {
          accumSport[element.Sport][element.Medal] = 0;
        }
        accumSport[element.Sport][element.Medal]++;
        accumSport[element.Sport].total++;
        return accumSport;
      }, {});
      return accumYear;
    }, {});
    return accumNOC;
  }, {});
  return sportsData;
}

RootComponent.displayName = 'RootComponent';
export default RootComponent;
