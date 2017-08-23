import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, signup} from '../store'

const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form className = 'login' onSubmit={handleSubmit} name={name}>
        { displayName && (displayName === 'Sign Up')
        ? <div>
          <input name='username' type='text' defaultValue='NAME' />
        </div>
        : ''
        }
        <div className = 'login-child1'>
          <input name='email' type='text' defaultValue="EMAIL" />
        </div>
        <div className = 'login-child2'>
          <input name='password' type='password' defaultValue='PASSWORD' />
        </div>
        <div className = 'login-child3'>
          <button type='submit'>{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
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

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
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

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}