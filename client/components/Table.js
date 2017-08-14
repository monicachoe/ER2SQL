import React, {Component} from 'react'
import axios from 'axios';

export default class Table extends Component{
  constructor(){
    super()
    this.state = {
      table: []
    }
  }

  componentDidMount (){
    const tablename = this.props.match.params.tablename;
    axios.get(`api/${tablename}/`)
    .then(res => res.data)
    .then(table => this.setState({table}))
  }

  render(){
    return(
        <div>
          <form>
            <label>Name:</label>
          </form>
        </div>
      )
  }
}