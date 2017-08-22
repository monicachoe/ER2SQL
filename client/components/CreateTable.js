import React, {Component} from 'react';
import {AddField} from '../components';
import store, {addTableToTemp} from '../store';

class CreateTable extends Component{
    constructor(){
        super();
        this.state = {
            tableName : '',
            fields : [],
            valid : false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        this.setState({
            fields : [...this.state.fields, {}],
            valid : false
        });
    }

    handleChange(e){
        e.preventDefault();
        if (e.target.name==='tableName') {
            this.setState({
                tableName : e.target.value,
                valid : validator(this.state.fields)
            })
        }
        else {
            this.state.fields[e.target.id] = Object.assign({}, this.state.fields[e.target.id], {[e.target.name]: e.target.value});
            this.setState({
                fields : this.state.fields,
                valid : validator(this.state.fields)
            })
        }
    }
    
    handleSubmit(e){
        e.preventDefault();
        let curFields = this.state.fields;
        let curState = store.getState();
        let table = {tableName : this.state.tableName, fields : {}, database : curState.database};
        for (var field of curFields){
            let temp = field.columnName;
            delete field['columnName'];
            table.fields[temp] = field;
        }
        store.dispatch(addTableToTemp(table));
        this.setState({
            tableName : '',
            fields : [],
            valid : false
        });
    }

    render(){
        let fieldsArr = [...Array(this.state.fields.length).keys()];
        return (
            <form onSubmit={this.handleSubmit}>
            <label>Table Name: <input type='text' name='tableName' onChange={this.handleChange} value={this.state.tableName}/></label>
            <button onClick={this.handleClick}>Add Field</button>
            <input type='submit' disabled={(this.state.tableName.length === 0) || !this.state.valid}/>
            {(this.state.tableName.length === 0) ? <p>Please input table name</p> : null}
            {(!this.state.valid && this.state.fields.length!==0) ? <p>Name and type of column is required</p> : null}
            <hr />
            {fieldsArr.map(each => <AddField key={each} id={each} handleChange={this.handleChange}/>)}
            </form>
        );
    }
}

function validator(fields){
        for (let each of fields){
            if (each.columnName===undefined || each.columnName==='' || each.type===undefined || each.type==='-') {
                return false
            }
        }
        return true;
    }

export default CreateTable;