import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, CreateDB, LoadDb, AddAssociation, Box, CreateTable, RemoveTable} from './components'
import {me, getUserDatabases} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.isLoggedIn && (nextProps.isLoggedIn !== this.props.isLoggedIn)){
      this.props.getUserDatabases();
    }
  }

  render () {
    // console.log("In routes", this.props.user);
    const {isLoggedIn} = this.props

    return (
      <Router history={history}>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path ='/' component = {Main} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route exact path='/createdb' component={CreateDB} />
            <Route path='/add-table' component={CreateTable} />
            <Route exact path='/loaddb' component={LoadDb} />
            <Route path='/add-association' component={AddAssociation} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path='/home' component={UserHome} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me());
    },
    getUserDatabases(){
      console.log("dispatched from routes")
      dispatch(getUserDatabases());
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
