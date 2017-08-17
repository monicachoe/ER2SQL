import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {CreateTable, Field, CreateDB} from './index';

export default class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showCreate: false,
            showLoad: false,
        }
        this.showCreateForm = this.showCreateForm.bind(this)
        this.showLoadForm = this.showLoadForm.bind(this)
        // this.showBothForm = this.showBothForm.bind(this)
    }
    showCreateForm(evt) {
        evt.preventDefault()
        if(this.state.showLoad){
            this.setState({
            showLoad: !this.state.showLoad
            })
        }
        this.setState({
            showCreate: !this.state.showCreate
        })
    }

    showLoadForm(evt) {
        evt.preventDefault()
        if(this.state.showCreate){
            this.setState({
            showCreate: !this.state.showCreate
            })
        }
        this.setState({
            showLoad: !this.state.showLoad
        })
    }
    // showBothForm(evt){
    //     evt.preventDefault()
    //     if(this.state.showLoad){
    //         this.state
    //     }
    //     this.setState({
    //         showLoad: !this.state.showLoad,
    //         showCreate: !this.state.showCreate
    //     })
    // }
    render() {
        return (
            <div>
                <h1>Options</h1>
                <button onClick={this.showCreateForm}>Create Db</button>
                <button onClick={this.showLoadForm}>Load DB</button>
                {
                    this.state.showLoad
                        ? <h1>Hello!</h1> : <div/>
                }
                {
                    this.state.showCreate
                    ? <CreateDB/> : <div/>
                }
                <CreateTable/>
            </div>
        )
    }
}
