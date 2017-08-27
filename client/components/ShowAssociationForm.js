import React, { Component } from 'react';
import { Association } from './index';
import Modal from './Modal';

class ShowAssociationForm extends Component {
    constructor(props) {
    super(props);
        this.state = { isOpen: false };
    }
    toggleModal = () => {
        this.setState({
        isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div className = 'ShowModal'>
                <button onClick={this.toggleModal}>+ ASSOCIATION</button>
                <Modal className = 'modal' show= {this.state.isOpen}
                    onClose={this.toggleModal}>
                    <Association/>
                    <button className = 'tablebutton' onClick ={this.toggleModal}>✕</button>
                </Modal>
            </div>
        )
    }
}
export default (ShowAssociationForm);
