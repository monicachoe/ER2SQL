import React from 'react';
import {connect} from 'react-redux';

const Field = (props) => {
    const types = props.dataTypes;
    console.log
    const curTable = props.currentTable;
    const handleChange = props.handleChange;
    const id=props.id;
    return (
        <div>
            <label>Name: <input type='text' name='columnName' id={id} onChange={handleChange}/></label>
            <label>Type: <select name='type' id={id} onChange={handleChange}>
                    <option>-</option>
                    {types.map((type) => <option value={type} key={type}>{type}</option>)}
                </select>
            </label>
            <label>Default Value: <input type='text' name='defaultValue' id={id} onChange={handleChange}/></label>
            <label>Validations: <select><option key={id} onChange={handleChange}>-</option></select></label>
            <hr />
        </div>
    )
}

const mapState = (state) => {
    return {
        dataTypes : state.datatypes,
        currentTable: state.currentTable
    }
}

const mapDispatch = (dispatch) => {
    return {
        addFieldToTable(e, curTable){
            e.preventDefault();
            const name = e.target.name.value;
            const type = e.target.type.value;
            const defaultValue = e.target.defaultValue.value;
            dispatch(addFieldToTable(curTable, name, {type, defaultValue}));
        }
    }
}

export default connect(mapState, mapDispatch)(Field);