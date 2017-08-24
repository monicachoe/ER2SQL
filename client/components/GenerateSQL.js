import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

export const GenerateSQL = (props) => {
    const { tables } = props
    var columns;
    var result;

    const download = (evt) => {
        evt.preventDefault()
        var filename = evt.target.name.value
        var text = evt.target.text.value
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    const scriptCreator = () => {
        result = ''
        tables && tables.map(table => {
            result = result + `CREATE TABLE ${table.name} (`
            table.fields.map((column, idx) => {
                if (table.fields.length === (idx + 1)){
                    // weird error comes up when adding all to result on one line 
                    // says something about result not being a function
                    result += ((Object.keys(column))[0])
                    result += ' '
                    result += ((Object.values(column))[0])
                    result += ' '
                // 
                }
                else {
                    result += ((Object.keys(column))[0])
                    result += ' '
                    result += ((Object.values(column))[0])
                    result += ', '
                }
            })
            result += ');'
        })
        return result
    }
    return (
        <div className='sqlScript'>
            <form onChange= {null } onSubmit={download}>
            <input onChange={null} type="text" name="name" value='tableSQLQuery' />
            <textarea className= 'textarea' onChange={null} name="text" value = {scriptCreator()}></textarea>
            <input onChange={null} type="submit" value="Download" />
        </form>
        </div>
    )
}

const mapStoredState = (state) => ({ tables: state.metatable })

export default connect(mapStoredState)(GenerateSQL);