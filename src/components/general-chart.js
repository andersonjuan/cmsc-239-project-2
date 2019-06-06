import React, {Component} from 'react';
import {XYPlot,
          XAxis,
          YAxis,
          HorizontalGridLines,
          VerticalGridLines,
          MarkSeries,
          Hint} from 'react-vis';

import {capitalizeFirstLetter, getStats} from './../utils.js'

function dictToarray(data) {
  return Object.keys(data).map(d => {
    const v = data[d].total;
    v.key = d;
    return v;
  })
}


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
      noc: 'USA',
      keyOfInterest: this.props.options[0],
      legalNocs: Object.keys(this.props.data)
      };

    this.handlNOCChange = this.handlNOCChange.bind(this);
    this.handleKOFchange = this.handleKOFchange.bind(this);
  };

  handlNOCChange(event) {
    event.persist()
    this.setState((state) => {
      const newQuerry = event.target.value.toUpperCase();
      if (this.state.legalNocs.includes(newQuerry)) {
        state.noc = newQuerry;
      }
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
    const dataRender = dictToarray(this.props.data[this.state.noc]);
    const plotWidth = this.props.dim.width;
    const plotHeight = this.props.dim.height;
    console.log(this.props.data)
    return (
      <div>
        <XYPlot
          width={plotWidth}
          height={plotHeight}
          getX={d => {
            if (d[this.state.keyOfInterest] === undefined) {
              return 0;
            }
            return d[this.state.keyOfInterest]}}
          getY={d => d.key}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <MarkSeries
            className="Graph 1"
            cx={d => {
              console.log(d[this.state.keyOfInterest]);
              if (d[this.state.keyOfInterest] === undefined) {
                return 0;
              }
              return d[this.state.keyOfInterest]}
            }
            cy={d => d.key}
            data={dataRender}/>
        </XYPlot>
        <div>
          <form>
            <input type="text" maxLength="3" onChange={this.handlNOCChange} />
          </form>
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
