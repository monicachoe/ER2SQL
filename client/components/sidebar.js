import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from './Table'
import Field from './Field'

export default class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showCreate: false,
            showLoad: false,
        }
        this.showCreateForm = this.showCreateForm.bind(this)
        this.showLoadForm = this.showLoadForm.bind(this)
    }
    showCreateForm(evt) {
        evt.preventDefault()
        this.setState({
            showCreate: !this.state.showCreate
        })
    }

    showLoadForm(evt) {
        evt.preventDefault()
        this.setState({
            showLoad: !this.state.showLoad
        })
    }
    render() {
        console.log(this.state)
        return (
            <div>
                <h1>Options</h1>
                <button onClick={this.showCreateForm}>Create Db</button>
                <button onClick={this.showLoadForm}>Load DB</button>
                {
                    this.state.showLoad
                        ? <h1>Hello!</h1> : <div/>
                }
            </div>
        );
    }
}