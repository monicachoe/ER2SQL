import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'

export const StoredTables = (props) => {
    const { tables } = props
    console.log('HERE IT IS', tables[0]);
    tables.forEach(function(element) {
        console.log("Each table data: ",element);
    });
    // const tables = [{id: 2 , name: 'Name', columns: [1, 2, 3]}]
    var columnNames;
    return (
        <div>
            {
                (tables.length) && tables.map((table) => {
                    (table) ? columnNames = (table.columns) : columnNames = false
                    return (
                        <table key={table.id} style={{ width: 25 + 'px' }}>
                            <tr>
                                <th>{table.name}</th>
                            </tr>

                            {columnNames &&
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
        tables: state.metatable
    }
}

export default connect(mapState)(StoredTables) 
