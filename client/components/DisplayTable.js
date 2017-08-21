import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

export const DisplayTables = (props) => {
    const { tables } = props
    console.log('INSIDE DISPLAYTABLES', tables)
    var columnNames;
    return (
        <div className='box'>
            {(tables) && tables.map((table, idx) => {
                (table) ? columnNames = (table.fields) : columnNames = false
                return (
                    <table key={idx} style={{ width: 25 + 'px' }}>
                        <tbody>
                            <tr>
                                <th>{table.name}</th>
                            </tr>
                            {columnNames && columnNames.map((column) => {
                                return (
                                    <tr key={column}>
                                        <td name="column" key={column}>{column}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )
            })}
        </div>
    )
}



const mapStoredState = (state) => ({tables : state.metatable})

export default connect(mapStoredState)(DisplayTables);