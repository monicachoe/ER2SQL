import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout, clearDatabase, clearUserDbs, clearMetatable, clearTemp} from '../store'
import {StoredTables, TempTables, CreateLoad, Sidebar, ShowModal} from './index'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
    const { children, handleClick, isLoggedIn, temp, metatable } = props

    return (
        <div id="main" className="container-fluid">

            <div>
                
                <nav className = 'nav'>
                  <h1>SimpleQL</h1>
                    {
                        isLoggedIn
                            ? <div>
                                {/* The navbar will show these links after you log in */}
                                <Link to='/home'>Home</Link>
                                <a href='#' onClick={handleClick}>Logout</a>
                                <Link to='/schema'>Schema</Link>
                            </div>
                            : <div>
                                {/* The navbar will show these links before you log in */}
                                <a href ='#'> <ShowModal className='showModal'/></a>
                                <Link to='/signup'>Sign Up</Link>
                            </div>
                    }
                </nav>
                {children}
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
    }
}

//On logging out all the other states should be cleared.
const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(clearUserDbs());
      dispatch(clearDatabase());
      dispatch(clearMetatable());
      dispatch(clearTemp());
      dispatch(logout());
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
