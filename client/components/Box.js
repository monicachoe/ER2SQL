import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'

// TEMP CONTAINS ALL NEWLY CREATED TABLES
//   columnName = Object.keys(table.table.fields)
// {
//     columnName.map((column) => {
//         return (
//             <tr>
//                 <td key="column">{column}</td>
//             </tr>
//         )
//     })
// }
export const Box = (props) => {
    const { tables } = props
    var columnNames;
    var columnOne = tables[0]
    // var columns = columnOne.table.fields
    console.log('YOUR CONSOLE HERE', columnOne)

    return (
        <div>
            {
                tables && tables.map((table) => {
                    (table.table.fields) ? columnNames = Object.keys(table.table.fields) : columnNames = false
                    return (
                        <table style={{ width: 25 + 'px' }}>
                            <caption>{table.table.tableName}</caption>

                            { columnNames &&
                                columnNames.map((column) => {
                                    return (
                                        <tr>
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
