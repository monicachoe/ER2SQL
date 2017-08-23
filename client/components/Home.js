import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, signup} from '../store'

const Home = (props) => {

  return (
    <div className = 'home-page'>
        <div className ='home-page-child1'>
            <h1>YOUR HOME FOR CREATING MAINTAINING YOUR DATABASE</h1>
        </div>
        <div className ='home-page-child2'>
        <img src='https://media.giphy.com/media/tAGy1LLKAR43u/giphy.gif'/>
        </div>
      
    </div>
  )
}

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault();
      let name;
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      if (formName === 'signup'){
        name = evt.target.username.value;
      }
      (formName === 'signup')
      ? dispatch(signup(name, email, password, formName))
      : dispatch(auth(email, password, formName));
    }
  }
}

export const HomePage = connect(mapLogin, mapDispatch)(Home)