import React from 'react';

const Field = (props) => {
    const types = ['string', 'text', 'integer','float', 'date', 'boolean', 'enum', 'array'];
    const {handleChange, id} = props;
    return (
        <div>
            <label>Name: <input type='text' name='columnName' id={id} onChange={handleChange}/></label>
            <label>Type: <select name='type' id={id} onChange={handleChange}>
                    <option>-</option>
                    {types.map((type) => <option value={type} key={type}>{type}</option>)}
                </select>
            </label>
            <label>Default Value: <input type='text' name='defaultValue' id={id} onChange={handleChange}/></label>
            <label>Validations: <select><option id={id} onChange={handleChange}>-</option></select></label>
            <hr />
        </div>
    )
}

export default Field;