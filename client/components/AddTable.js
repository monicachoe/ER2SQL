import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addTableToTemp} from '../store';

const Table = (props) => {
    return (
        <div>
            <label>Table Name: <input type='text' name='tableName'/></label>
        </div>
    )
}

const mapState = (state) => {
    return {

    }
}

const mapDispatch = (dispatch) => {
    return {
        onAddTable(e){
            e.preventDefault();
            const tableName = e.target.tableName.value;
            const table = {tableName, fields : {}};
            dispatch(addTableToTemp(table));
        }
    }
}

export default connect(mapState, mapDispatch)(Table);