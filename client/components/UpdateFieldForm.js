import React, { Component } from 'react';
import Modal from './Modal';
import {UpdateFieldName} from './index'

class UpdateFieldForm extends Component {
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
         <button onClick={this.toggleModal}>RENAME FIELD</button>
        

        <Modal className = 'modal' show={this.state.isOpen}
          onClose={this.toggleModal}>
          <h1>UPDATE FIELD</h1>
          <UpdateFieldName className = 'ShowModal'/>
          <button className = 'tablebutton' onClick={this.toggleModal}>✕</button>
        </Modal>
      </div>
    );
  }
}

export default UpdateFieldForm;