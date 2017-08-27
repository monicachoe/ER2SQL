import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {ShowModal, ShowSignupForm} from './index'
import {connect} from 'react-redux'
import {logout, clearDatabase, clearUserDbs, clearMetatable} from '../store'

 class HomePageStack extends React.Component {
    constructor() {
    super();
    this.styling = this.styling.bind(this);
  }

  componentDidMount() {
    this.styling();
  }

    styling(){
    var page = this.refs.page;
    // This transition can be defined in the CSS if preferred.
    var transition = 'top .8s cubic-bezier(0.77, 0, 0.175, 1)';
    page.style.transition = transition;
    page.onclick = slideDown;

    function slideDown(e) {
      // Delegate.
      if (e.target.className !== 'next') {
        return;
      }

      // Prevent firing simultaneously.
      page.onclick = '';
      var self = e.target.parentNode;
      var offset = self.getBoundingClientRect();
      var scroll = self.offsetTop;

      // CSS Transition slide.
      page.style.top = (-offset.height-offset.top) + 'px';

      setTimeout(function () {
        // Reposition the real scrollbar.
        page.style.transition = 'none';
        page.style.top = '';
        window.scrollTo(0, offset.height+scroll);
        page.style.transition = transition;
        // Reattach event.
        page.onclick = slideDown;

        // This timeout length should match the CSS animation time (.8s).
      }, 800);
    }
  }
    render () {
        return (
        <div id="page" ref="page">
            <section className="one">

                <div className ="one-child description">
                    <img src = 'https://media.giphy.com/media/ARrPXri3V72Fi/giphy.gif' />
                    <h1>your database</h1>
                    {
                        this.props.isLoggedIn
                        ? <div>
                            <Link to ='/home'> Your Account </Link>
                            <a href='#' onClick={this.props.handleClick}>Logout</a>
                        </div>

                        : <div>
                             <ShowModal className='showModal'/>
                            <ShowSignupForm/>
                          </div>

                    }

                </div>
                <div className = 'one-child1'>
                    <img src = "http://i.imgur.com/4fpFWqa.png" />
                </div>

                <div className="next"></div>
            </section>
            <section className="two">
                <img src='https://media.giphy.com/media/UFea5mrjm8NA4/giphy.gif' />
                <div className="nav">
                    <h1 className="two-child" style={{color: 'pink'}}><Link to='/'>HOW IT WORKS</Link></h1>
                    <ul className="nav-links">
                    </ul>
                </div>
                <div className="next"></div>
            </section>
            <section className="three">
                <h1 className = "two-child description">you can upload data to your tables</h1>
                <div className="nav">
                    <h1 className="two-child" style={{color: 'pink'}}><Link to='/'>you can create sql scripts for your tables</Link></h1>
                    <ul className="nav-links">
                    </ul>
                </div>
                <div className="next"></div>
            </section>
        </div>
    )
  }
}

const mapStoredState = (state) => ({ isLoggedIn: !!state.user.id })
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

export default connect(mapStoredState, mapDispatch)(HomePageStack);
