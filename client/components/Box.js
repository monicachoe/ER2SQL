import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'

// TEMP CONTAINS ALL NEWLY CREATED TABLES
export const Box = (props) => {
    const { tables } = props
    console.log(tables)
    var columnName;
    return (
        <div>
            {
                tables && tables.map((table) => {
                    columnName = Object.keys(table.fields)
                    return (

                        <table style={{ width: 25 + 'px' }}>
                            <caption>{table.tableName}</caption> 
                            {
                                columnName.map((column) => {
                                    return (
                                        <tr>
                                            <td>{column}</td>
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
