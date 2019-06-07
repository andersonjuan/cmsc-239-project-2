import React, {Component} from 'react';
import {XYPlot,
          XAxis,
          YAxis,
          HorizontalGridLines,
          VerticalGridLines,
          MarkSeries,
          Hint} from 'react-vis';

import {capitalizeFirstLetter, getStats, getRandomInt} from './../utils.js';

/*
 *
 *  data = list of dictionaries with the necessary information to render the data.
 *  dim = {width, height}
 *  options = [list of filter keys] - first key is the key to access the array of data
 *
 *
 */
export default class AthleteMedalCounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noc: Object.keys(this.props.data)[getRandomInt(Object.keys(this.props.data).length)],
      keyOfInterest: this.props.options[0],
      legalNocs: Object.keys(this.props.data),
      yDomain: getYdomain(this.props.data),
      xDomain: getXdomain(this.props.data)
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
    console.log(newQuerry);
    this.setState((state) => {
      state.keyOfInterest = newQuerry;
      return state;
    });
  }


}
