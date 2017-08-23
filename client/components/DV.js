import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryPie } from 'victory';

class PieChart extends Component {
  render() {
    let data =['male', 'x','x', 'female', 'female','male', 'female', 'female', 'female','male', 'female', 'female', 'female','male', 'female', 'female', 'female','male', 'female', 'female', 'female','male'];
    return (
      <VictoryPie data={formatData(data)}/>
    );
  }
}

const formatData = (data) =>{
  let dataSet = new Set(data);
  let final = []
  for (let i of dataSet) {
    final.push({x : i, y : data.filter(each => each === i).length})
  }
  return final
}

export default PieChart