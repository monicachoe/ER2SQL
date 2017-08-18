import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'

export const Box = (props) => {
    const { tables } = props
    var columnNames;
    return (
        <div>
            {
                tables && tables.map((table) => {

                    (table.table.fields) ? columnNames = Object.keys(table.table.fields) : columnNames = false
                    return (
                        <table key= {table.tableId} style={{ width: 25 + 'px' }}>
                            <tr>
                                <th>{table.table.tableName}</th>
                            </tr>

                            { columnNames &&
                                columnNames.map((column) => {
                                    return (
                                        <tr key={column}>
                                            <td key="column">{column}</td>
                                        </tr>
                                    )
                                })
                            }
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
        tables: state.temp
    }
}

export default connect(mapState)(Box) 
