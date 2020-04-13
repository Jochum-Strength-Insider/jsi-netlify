import React, { memo } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
   const style = { color: "#412a34" }

   return (
      <div style={style} className="d-flex justify-content-center">
         <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
         </Spinner>
      </div>
   )
}

export default memo(Loading);
