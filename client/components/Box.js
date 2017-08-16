import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'

export const Box = (props) => {
    const {temp} = props
    console.log(temp)
    return (
        <table style={{ width: 25 + 'px' }}>
            <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Age</th>
            </tr>
            <tr>
                <td>Jill</td>
                <td>Smith</td>
                <td>50</td>
            </tr>
            <tr>
                <td>Eve</td>
                <td>Jackson</td>
                <td>94</td>
            </tr>
        </table>
    )
}

const mapState = (state) => {
    return {
        temp: state.temp
    }
}

export default connect(mapState)(Box) 
