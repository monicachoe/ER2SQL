import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Sidebar from './Sidebar'
import CreateLoad from './CreateLoad'
import DisplayTable from './DisplayTable'
/**
 * COMPONENT
 */
export const SchemaPage = (props) => {
    const { isLoggedIn, metatable } = props
    return (

        <div className='schema'>
            <div className='schild1'>
                <Sidebar />
            </div>
            <div className='schild2'>
                <DisplayTable />
            </div>

        </div>
    )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        isLoggedIn: !!state.user.id,
        metatable: state.metatable,
        temp: state.temp
    }
}

export default connect(mapState)(SchemaPage)