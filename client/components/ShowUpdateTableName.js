import React, { Component } from 'react';
import Modal from './Modal';
import {UpdateTableName} from './index'

class ShowUpdateTableName extends Component {
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
         <button onClick={this.toggleModal}>RENAME TABLE</button>
        <Modal className = 'modal' show={this.state.isOpen}
          onClose={this.toggleModal}>
          <h1>RENAME TABLE</h1>
          <UpdateTableName className = 'ShowModal'/>
          <button className = 'tablebutton' onClick={this.toggleModal}>✕</button>
        </Modal>
      </div>
    );
  }
}

export default ShowUpdateTableName;