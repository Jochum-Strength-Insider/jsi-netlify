import React from 'react';

import Modal from 'react-bootstrap/Modal';

const MyModal = ({handleClose, show, heading, children}) => {
   return (
      <Modal
         show={show}
         onHide={handleClose}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
               {heading}
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {children}
         </Modal.Body>
      </Modal>
   )
}

export default MyModal