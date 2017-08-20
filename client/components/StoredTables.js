import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'

export const StoredTables = (props) => {
    const { tables } = props
    var columnNames;
    return (
        <div>
            {
                (tables) && tables.map((table, idx) => {
                    (table) ? columnNames = (table.fields) : columnNames = false
                    return (
                        <table key={idx} style={{ width: 25 + 'px' }}>
                            <tbody>
                            <tr>
                                <th>{table.name}</th>
                            </tr>

                            {columnNames &&
                                columnNames.map((column) => {
                                    return (
                                        <tr key={column}>
                                            <td name="column" key={column}>{column}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        </table>
                    )
                }

                )
            }
        </div>
    )
}

const mapState = (state) => {
    return {
        tables: state.metatable
    }
}

export default connect(mapState)(StoredTables)
