import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Sidebar from './sidebar'
import TempTable from './TempTable'
import StoredTables from './StoredTables'
import CreateLoad from './CreateLoad'
import DisplayTable from './DisplayTable'
/**
 * COMPONENT
 */
export const SchemaPage = (props) => {
    const {isLoggedIn} = props
  return (
    <div className = 'schema'>
        <div className = 'schild1'>
            <Sidebar/>
        </div>
        <div className = 'schild2'>
                {
                    isLoggedIn
                        ? <CreateLoad />
                        : <div />
                }
                <DisplayTable/>

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
