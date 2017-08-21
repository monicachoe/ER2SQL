import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {CreateLoad} from './index'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { name, db } = props
  console.log('DATABASE HERE', db)
  return (
    <div>
      {
        (db.length)
          ? <div>
            <h1>Welcome {name}</h1>
            <h1>You Have : {db.length} databases </h1>
          </div>
          : <div>
            <h1>Welcome {name}</h1>
            <h1>You don't have any databases yet. Create one! </h1>
          </div>

      }
      <CreateLoad/>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    name: state.user.name,
    db: state.userdbs
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
