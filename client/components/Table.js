import React, {Component} from 'react';
import {connect} from 'react-redux';

const Table = () => {
    return (
        <form onSubmit={props.onAddTable}>
            <label>Table Name: <input type='text' name='tableName'/></label>
            <input type='submit' />
        </form>
    )
}

const mapState = (state) => {
    return {

    }
}

const mapDispatch = (dispatch) => {
    return {
        onAddTable(e, tableName){
            e.preventDefault();
            dispatch(addTableToTemp(tableName));
        } 
    }
}

export default connect(mapState, mapDispatch)(Table)