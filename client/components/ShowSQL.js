import React, { Component } from 'react';
import Modal from './Modal';
import GenerateSQL from './GenerateSQL'

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
         <button onClick={this.toggleModal}>SQL QUERY</button>
        

        <Modal className = 'modal' show={this.state.isOpen}
          onClose={this.toggleModal}>
          <GenerateSQL/>
          <button onClick={this.toggleModal}>close</button>
        </Modal>
      </div>
    );
  }
}

export default ShowModal;