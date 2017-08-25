import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

export const DisplayTables = (props) => {
    const { tables } = props
    var columnNames;
    return (
        <div className='box'>
            {(tables) && tables.map((table, idx) => {
                (table) ? columnNames = (table.fields) : columnNames = false
                return (
                    <table key={idx} style={{ width: '10vw' }}>
                        <caption>{table.name}</caption>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                            </tr>
                            {columnNames && columnNames.map((column) => {
                                let name = Object.keys(column)[0];
                                return (
                                    <tr key={name}>
                                        <td name="column" key={name}>{name}</td>
                                        <td name="type" key={column[name]}>{column[name]}</td>
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

const mapStoredState = (state) => ({ tables: state.metatable })

export default connect(mapStoredState)(DisplayTables);