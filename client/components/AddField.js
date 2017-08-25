import React from 'react';

const Field = (props) => {
    const types = ['string', 'text', 'integer','float', 'date', 'boolean'];
    const {handleChange, id} = props;
    return (
        <div className='fieldGrid'>
            <input className='fieldInput' type='text' name='columnName' id={id} onChange={handleChange}/>
            <select className='fieldInput' name='type' id={id} onChange={handleChange}>
                <option>-</option>
                {types.map((type) => <option value={type} key={type}>{type}</option>)}
            </select>
            <input className='fieldInput' type='text' name='defaultValue' id={id} onChange={handleChange}/>
        </div>
    )
}

export default Field;