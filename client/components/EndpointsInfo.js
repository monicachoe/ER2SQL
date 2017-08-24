import React from 'react';
import {connect} from 'react-redux';

const EndpointsInfo = (props) => {
    return (
        <div>
            <p>DevId : {props.user.devId}</p>
            <p>Instructions: md5 hash devId + apiKey + UTC time</p>
        </div>
    )
}

const mapState = (state) => {
    return {
        user : state.user
    }
}

export default connect(mapState)(EndpointsInfo);