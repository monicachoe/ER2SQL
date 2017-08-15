import React from 'react';
import {connect} from 'react-redux';

const Field = (props) => {
    const types = ['string', 'text', 'float', 'date', 'boolean', 'enum', 'array'];
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

export default Field;