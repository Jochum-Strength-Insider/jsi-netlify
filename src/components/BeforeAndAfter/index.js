import React from 'react';

import UploadBefore from './UploadBefore';
import UploadAfter from './UploadAfter';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const BeforeAndAfter = ({ authUser }) => {
   return (
      <>
         <Row>
            <Col className="mb-3" xs="12" sm="6"><UploadBefore uid={authUser.uid} /></Col>
            <Col className="mb-3" xs="12" sm="6"><UploadAfter uid={authUser.uid} /></Col>
         </Row>
         {/* <UploadAfter uid={authUser.uid} /> */}
      </>
   )
}

export default BeforeAndAfter;
