import React, { Component } from 'react';
import Modal from './Modal';
import GenerateSQL from './GenerateSQL'
import history from '../history'

class ShowModal extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
    // history.push('/data')
  }

  render() {
    return (
      <div className="ShowModal">
         <button onClick={this.toggleModal}>CREATE SCRIPT</button>
        

        <Modal className = 'modal' show={this.state.isOpen}
          onClose={this.toggleModal}>
          <button className = 'tablebutton' onClick={this.toggleModal}>✕</button>
          <GenerateSQL/>
          
        </Modal>
      </div>
    );
  }
}

export default ShowModal;