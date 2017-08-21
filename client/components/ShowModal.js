import React, { Component } from 'react';
import Modal from './Modal';
import {Login} from './auth-form'

class ShowModal extends Component {
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
      <div className="ShowModal">
         <a href='#' onClick={this.toggleModal}>Login</a>
        

        <Modal className = 'modal' show={this.state.isOpen}
          onClose={this.toggleModal}>
          <Login className = 'ShowModal'/>
        </Modal>
      </div>
    );
  }
}

export default ShowModal;