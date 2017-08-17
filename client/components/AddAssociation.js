import React, {Component} from 'react';
import {connect} from 'react-redux'

const AddAssociation = (props) => {
    const dummyData = ['monica', 'brenda', 'kelaiya', 'vinaya'];
    const assocTypes = ['belongsTo', 'hasOne', 'hasMany'];
    let handleSubmit = props.handleSubmit;
    return (
        <form onSubmit={handleSubmit}>
            <label>Table1: <select name='table1'>
                <option>-</option>
                {dummyData.map(each => <option value={each}>{each}</option>)}
            </select>
            </label>
            <label>Table2: <select name='table2'>
                <option>-</option>
                {dummyData.map(each => <option value={each}>{each}</option>)}
            </select>
            </label>
            <label>Association Type: <select name='associationType'>
                <option>-</option>
                {assocTypes.map(each=> <option value={each}>{each}</option>)}
                </select>
            </label>
            <input type='submit' />
        </form>
    )
}

const mapState = (state) => {
    return {}
}

const mapDispatch = (dispatch) => {
    return {
        handleSubmit(e){
            console.log('submitted');
        }
    }
}

export default connect(mapState, mapDispatch)(AddAssociation);