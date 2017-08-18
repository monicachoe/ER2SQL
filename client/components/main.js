import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout, clearDatabase, clearUserDbs} from '../store'
import {default as TempTable} from './TempTable'
import {default as Sidebar} from './sidebar'
import { default as CreateLoad } from './CreateLoad'
import {default as StoredTables} from './StoredTables'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
    const { children, handleClick, isLoggedIn } = props

    return (
        <div id="main" className="container-fluid">
            <div className="child1">
                <Sidebar />
            </div>
            <div className="child2">
                <h1>SimpleQL</h1>
                <nav>
                    {
                        isLoggedIn
                            ? <div>
                                {/* The navbar will show these links after you log in */}
                                <Link to='/home'>Home</Link>
                                <a href='#' onClick={handleClick}>Logout</a>
                            </div>
                            : <div>
                                {/* The navbar will show these links before you log in */}
                                <Link to='/login'>Login</Link>
                                <Link to='/signup'>Sign Up</Link>
                            </div>
                    }
                </nav>
                <hr />
                {children}
                {
                    isLoggedIn
                        ? <CreateLoad />
                        : <div />
                }
                <StoredTables/>
                <TempTable className="Boxes"/>
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
        metatable: state.metatable
    }
}

//On logging out all the other states should be cleared.
const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(clearUserDbs());
      dispatch(clearDatabase());
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
    children: PropTypes.object,
    handleClick: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
}
