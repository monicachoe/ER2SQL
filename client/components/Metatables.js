import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getMetatables } from '../store'

/**
 * COMPONENT
 */
export const Metatables = (props) => {
    let handleChange = props.handle
    return (
        <div>
            <h3>Welcome</h3>
            <input onChange={handleChange} />
        </div>
    )
}

/**
 * CONTAINER
 */



const mapDispatch = (dispatch) => {
    return {
        loadTables() {
            dispatch(getMetatables(1))
        }
    }
}

export default connect(mapDispatch)(Metatables)
