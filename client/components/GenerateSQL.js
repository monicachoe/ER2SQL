import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

export const GenerateSQL = (props) => {
    const { tables } = props
    var columns;
    return (
        <div className = 'sqlScript'>
                {(tables) && tables.map(table =>
                    <p>CREATE TABLE {table.name} ( {table.fields.map((column, idx) => {
                        return (
                            table.fields.length === (idx + 1)
                                ? <p>{column} text</p>
                                : <p>{column} text,</p>
                        )
                    })
                    } );</p>
                )}

        </div>
    )
}

const mapStoredState = (state) => ({ tables: state.metatable })

export default connect(mapStoredState)(GenerateSQL);