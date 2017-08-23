import React, { Component } from 'react';
import Modal from './Modal';
import {Signup} from './index'

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
         <a href='#' onClick={this.toggleModal}>Signup</a>
        

        <Modal className = 'modal' show={this.state.isOpen}
          onClose={this.toggleModal}>
          <h1>Signup</h1>
          <Signup className = 'ShowModal'/>
          <button onClick={this.toggleModal}>close</button>
        </Modal>
      </div>
    );
  }
}

export default ShowModal;