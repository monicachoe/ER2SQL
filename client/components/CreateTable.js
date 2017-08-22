import React, {Component} from 'react';
import {AddField} from '../components';
import {connect} from 'react-redux';
import store, {addTableToTemp} from '../store';

class CreateTable extends Component{
    constructor(){
        super();
        this.state = {
            tableName : '',
            fields : [],
            fieldsValid : false,
            tableNameValid : false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        this.setState({
            fields : [...this.state.fields, {}],
            fieldsValid : false
        });
    }

    handleChange(e){
        e.preventDefault();
        if (e.target.name==='tableName') {
            this.setState({
                tableName : e.target.value,
                tableNameValid : tableNameValidator(e.target.value, this.props.tables)
            });
        }
        else {
            this.state.fields[e.target.id] = Object.assign({}, this.state.fields[e.target.id], {[e.target.name]: e.target.value});
            this.setState({
                fields : this.state.fields,
                fieldsValid : fieldValidator(this.state.fields)
            })
        }
    }
    
    handleSubmit(e){
        e.preventDefault();
        let curFields = this.state.fields;
        let table = {tableName : this.state.tableName, fields : {}, database : this.props.database};
        for (var field of curFields){
            let temp = field.columnName;
            delete field['columnName'];
            table.fields[temp] = field;
        }
        this.props.submitHelper(table);
        // store.dispatch(addTableToTemp(table));
        this.setState({
            tableName : '',
            fields : [],
            fieldsValid : false,
            tableNameValid : false
        });
    }

    render(){
        let fieldsArr = [...Array(this.state.fields.length).keys()];
        console.log('my tables : ',this.props.tables)
        return (
            <form onSubmit={this.handleSubmit}>
            <label>Table Name: <input type='text' name='tableName' onChange={this.handleChange} value={this.state.tableName}/></label>
            <button onClick={this.handleClick}>Add Field</button>
            <input type='submit' disabled={(this.state.tableName.length === 0) || !this.state.fieldsValid || !this.state.tableNameValid}/>
            {(this.state.tableName.length === 0) ? <p>Please input table name</p> : null}
            {(!this.state.tableNameValid && this.state.tableName.length>0) ? <p>Tablename is invalid</p> : null}
            {(!this.state.fieldsValid && this.state.fields.length!==0) ? <p>Name and type of column is required</p> : null}
            <hr />
            {fieldsArr.map(each => <AddField key={each} id={each} handleChange={this.handleChange}/>)}
            </form>
        );
    }
}

function fieldValidator(fields){
    for (let each of fields){
        if (each.columnName===undefined || each.columnName==='' || each.type===undefined || each.type==='-') {
            return false;
        }
    }
    return true;
}

function tableNameValidator(tableName, tables){
    for (let each of tables){
        if (tableName === each.name){
            return false;
        }
    }
    return true;
}

const mapState = (state) => {
    return {
        tables : state.metatable,
        database : state.database
    }
}

const mapDispatch = dispatch => {
    return {
        submitHelper(table){ 
            dispatch(addTableToTemp(table))
        }
    }
}

export default connect(mapState, mapDispatch)(CreateTable);