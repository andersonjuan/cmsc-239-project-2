import React from 'react';
import {csv} from 'd3-fetch';
import ButtonFilterChart from './general-chart';
import SportsCountryChart from './sportsCountryChart';
import {Intro, Intro11, Intro2, Intro21, Intro3, Conclusion, Para1, Para12, 
  Para2, Para21, Para3, Para31, Para4, Para41, Para5} from '../text.js';
import AthleteMedalCounts from './athlete-medal-counts';
import AthleteFactors from './athlete-factors';
import ParallelCoords from './paraCoordsChart';

import {ANOCA, PANAM, OCA, EOC, ONOC} from './../constants.js';

import {categorizeBy,
          grabBy,
          getStats,
          getCatRange,
          countBy,
          createRegionDict} from './../utils.js'

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
    let medalsData = categorizeBy(cleanedData, 'NOC', 'Year');
    let athleteMedals = categorizeBy(cleanedData, 'Sport', 'Age');
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
    const athleteFactors = createAtheleteFactData(cleanedData, 1970);
    const paraCoords = cleanPara(cleanedData, 1970);
    const countriesMap = NOCtoCountries(cleanedData, 1970)
    // console.log(countriesMap, Object.values(countriesMap))

    // console.log(athleteFactors)
    return (
      <div className="relative" style={{backgroundColor: "#e3dedb"}}>
        <h1>Gold Medal Vis: A Visual History of the Olympics Since 1970</h1>
        <Intro />
        <Intro11 />
        <Intro2 />
        <Intro21 />
        <Intro3 />
        <Para1 />
        <Para12 />
        <ButtonFilterChart data={medalsData} options={medals} dim={dimension} countries={countriesMap}/>
        <Para2 />
        <Para21 />
        <SportsCountryChart data={sportsData} options={medals.concat("All")} dim={dimension} />
        <Para3 />
        <Para31 />
        <AthleteMedalCounts data={athleteMedals} options={medals} dim={dimension} />
        <Para4 />
        <Para41 />
        <AthleteFactors data={athleteFactors} options={["Age", "Weight", "Height"]} dim={dimension}
        xDomain={[1970, 2018]}/>
        <Para5 />
        <ParallelCoords data={paraCoords} options={["Min", "Max", "Median", "Mean"]} dim={{height:500, width:1000}}
        years={[1970, 2018]}/>
        <Conclusion />
      </div>
    );
  }
}

function createSportsDataset(data, year) {
  const cleanedData = data;
  // const cleanedData = data.filter(d => (Number(d.Year) >= year));
  let sportsData = categorizeBy(cleanedData, 'NOC', 'Year')
  sportsData = Object.keys(sportsData).reduce((accumNOC, country) => {

    const countryData = sportsData[country];
    accumNOC[country] = Object.keys(countryData).reduce((accumYear, year) => {

      accumYear[year] = countryData[year].reduce((accumSport, element) => {
        if (accumSport[element.Sport] === undefined) {
            accumSport[element.Sport] = {Total: 0};
        }
        if (accumSport[element.Sport][element.Medal] === undefined) {
          accumSport[element.Sport][element.Medal] = 0;
        }
        accumSport[element.Sport][element.Medal]++;
        accumSport[element.Sport].Total++;
        return accumSport;
      }, {});
      return accumYear;
    }, {});
    return accumNOC;
  }, {});
  return sportsData;
}

function createAtheleteFactData(data, year) {
  const cleanedData = data;
  // const cleanedData = data.filter(d => (Number(d.Year) >= year));
  let reducedData = cleanedData.reduce((newDataSet, person) => {
    const sport = person.Sport;
    if (newDataSet[sport] === undefined) {
        newDataSet[sport] = {Weight: {}, Age: {}, Height: {}}
    }
    if ((newDataSet[sport].Weight)[person.Year] === undefined) {
      (newDataSet[sport].Weight)[person.Year] = {People: [], Data: []};
      (newDataSet[sport].Age)[person.Year]= [];
      (newDataSet[sport].Height)[person.Year] = [];
    }

    if (!((newDataSet[sport].Weight[person.Year].People).includes(person.Name))) {
      if (!(Number.isNaN(Number(person.Weight)) ||
              Number.isNaN(Number(person.Age)) ||
              Number.isNaN(Number(person.Height)))) {
        (newDataSet[sport].Weight)[person.Year].Data.push(Number(person.Weight));
        (newDataSet[sport].Weight)[person.Year].People.push(person.Name);
        (newDataSet[sport].Age)[person.Year].push(Number(person.Age));
        (newDataSet[sport].Height)[person.Year].push(Number(person.Height));
      }
    }
    return newDataSet;
  }, {});
  reducedData = Object.keys(reducedData).reduce((accum, sport) => {
    const newData = {...reducedData[sport]};
    newData.Weight = Object.keys(newData.Weight).reduce((accum, year) => {
      accum[year] = (newData.Weight)[year].Data;
      return accum;
    }, {});
    accum[sport] = newData
    return accum;
  }, {});

  return reducedData;
}

function cleanPara(data, year) {
  const cleanedData = data;
  // const cleanedData = data.filter(d => (Number(d.Year) >= year));
  const regions = createRegionDict();
  let reducedData = cleanedData.reduce((newDataSet, person) => {
    const country = person.NOC;
    if (newDataSet[country] === undefined) {
        newDataSet[country] = {};
    }
    if (newDataSet[country][person.Year] === undefined) {
      newDataSet[country][person.Year] = {People: [], Data: []};
    }

    if (!(newDataSet[country][person.Year].People).includes(person.Name)) {
        newDataSet[country][person.Year].People.push(person.Name);
        person.region = regions[country];
        newDataSet[country][person.Year].Data.push(person);
    }
    return newDataSet;
  }, {});

  reducedData = Object.keys(reducedData).reduce((accum, country) => {
    const newData = {...reducedData[country]};
    accum[country] = Object.keys(newData).reduce((accumLocal, year) => {
        accumLocal[year] = newData[year].Data;
        return accumLocal;
      }, {});;
    return accum;
  }, {});

  return reducedData;
}

function NOCtoCountries(data, year) {
  return data.reduce((accum, d) => {
    const country = (d.Team).replace(/[.,\/#!$%\^&\*;:{}=\-_`~()0-9]/g,"").replace(/[0-9]/g, "")
    if (accum[country] === undefined) {
      accum[country] = d.NOC;
    }
    return accum;
  }, {});
}

RootComponent.displayName = 'RootComponent';
export default RootComponent;
