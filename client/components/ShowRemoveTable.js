import React, { Component } from 'react';
import Modal from './Modal';
import {RemoveTable} from './index'

class ShowRemoveTable extends Component {
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
         <button  onClick={this.toggleModal}>REMOVE TABLE</button>
        

        <Modal className = 'modal' show={this.state.isOpen}
          onClose={this.toggleModal}>
          <h1>REMOVE TABLE</h1>
          <RemoveTable/>
          <button className='tablebutton' onClick={this.toggleModal}>✕</button>
        </Modal>
      </div>
    );
  }
}

export default ShowRemoveTable;