import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout, clearDatabase, clearUserDbs, clearMetatable} from '../store'
import {StoredTables, TempTables, Sidebar, ShowModal,UpdateTableName, ShowSignupForm} from './index'

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
                    <div className= 'logoandname'>
                        <img className = 'logo' src= 'http://www.freeiconspng.com/uploads/sql-server-icon-png-29.png'/>
                        <Link to='/'><h1>SimpleQL</h1></Link>
                    </div>
                    {
                        isLoggedIn
                            ? <div>
                                {/* The navbar will show these links after you log in */}
                                <Link to='/home'>Home</Link>
                                <a href='#' onClick={handleClick}>Logout</a>
                            </div>
                            : <div>
                                {/* The navbar will show these links before you log in */}
                                 <ShowModal/>
                                 <ShowSignupForm/>
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
