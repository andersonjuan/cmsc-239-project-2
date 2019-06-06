import React, {Component} from 'react';
import {XYPlot,
          XAxis,
          YAxis,
          HorizontalGridLines,
          VerticalGridLines,
          MarkSeries,
          Hint} from 'react-vis';

import {capitalizeFirstLetter, getStats} from './../utils.js'

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
      noc: 'DEF',
      keyOfInterest: this.props.options[0]
      };

    this.handlNOCChange = this.handlNOCChange.bind(this);
    this.handleKOFchange = this.handleKOFchange.bind(this);
  };

  handlNOCChange(event) {
    this.setState((state) => {
      state.noc = event.target.value.toUpperCase();
      return state;
    });
  }

  handleKOFchange(change) {
    this.setState((state) => {
      state.keyOfInterest = change;
      return state;
    });
  }

  render() {
    const {width, height} = this.props.dim;
    return (
      <div>
        <div>
          <input type="text" maxLength="3" onChange={this.handlNOCChange} />
        </div>
        {(this.props.options).length > 1 &&
          this.props.options.map(opt => {
            return (<button key={opt} onClick={this.handleKOFchange}>
              {capitalizeFirstLetter(opt)}
            </button>)
          })
        }
      </div>
    );
  }
}
