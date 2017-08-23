import React, {Component} from 'react';
import {connect} from 'react-redux';

const VisualizationForm = () => {
    return (
        <div></div>
    )
}

const mapState = (state) => {
    return {
        tables : state.metatable
    }
}

const mapDispatch = (dispatch) => {
    return {

    }
}

export default connect(mapState, mapDispatch)(VisualizationForm);