import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CreateLoad } from './index'
import { loadDatabase, getMetatables } from '../store';
import history from '../history'

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(evt) {
    evt.preventDefault()
    console.log('VALUE', evt.target)
    let selectedDb = this.props.userdbs.filter((eachDb) => eachDb.name === evt.target.innerHTML);
    this.props.loadDatabase(selectedDb[0]);
    var table = selectedDb[0]
    this.props.getMetatables(table.id)
    history.push('/schema')
  }
  render() {
    var databases = this.props.userdbs
    return (
      <div>
        <CreateLoad />
        {
          (databases.length)
            ? <div className = 'userHome'>
              <h1>Welcome {this.props.user.name}, you have {databases.length} databases </h1>
              
              <div className='db'>
                {
                  databases.map((db) =>
                    <div key = {db.id} className='dbImg'>
                      <img src={'https://www.moh.io/box/mohiomap-boxbeta/images/privacy/database.svg'} />
                      <button onClick = {this.handleClick}>{db.name}</button>
                    </div>
                  )
                }
              </div>
            </div>
            : <div>
              <h1>Welcome {this.props.user.name}</h1>
              <h1>You don't have any databases yet. Create one! </h1>
            </div>

        }
      </div>
    )
  }

}

/**
 * CONTAINER
 */
const mapStateToProps = ({ user, userdbs, database, metatable }) => ({ user, userdbs, database, metatable });

const mapDispatch = (dispatch) => {
  return {
    loadDatabase(selectedDb) {
      dispatch(loadDatabase(selectedDb));
    },
    getMetatables(userdbs) {
      dispatch(getMetatables(userdbs));
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
