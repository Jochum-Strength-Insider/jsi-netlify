import React, { memo, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

import Modal from '../Modal';

import './style.css';

const ImageUpload = ({ onSubmit, onRemove, onFileChange, img, error, file, title }) => {
   const [open, setOpen] = useState(false);
   const [isInvalid, setIsInvalid] = useState(null);

   const handleClose = () => {
      setIsInvalid(null);
      setOpen(false)
   };
   const handleOpen = () => setOpen(true);

   const label = file ? file.name : "Choose File";

   const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(e);
      handleClose();
   }

   const handleFileChange = (e) => {
      e.preventDefault();
      try {
         const file = e.target.files[0];
         if (file.size > 3000000) {
            throw new Error("File must be smaller than 3mb");
         }
         if (file.type !== "image/jpeg" && file.type !== "image/png") {
            throw new Error("File must be a .png or .jpeg");
         }
         else {
            setIsInvalid(null);
            onFileChange(e);
         }
      } catch (error) {
         if (error) {
            setIsInvalid(error);
         }
      }
   }

   return (
      <>
         <Modal show={open} handleClose={handleClose} heading={"Change Photo"}>
            <Form onSubmit={handleSubmit}>
               <Form.Group>
                  <div className="custom-file">
                     <input className={isInvalid ? "is-invalid custom-file-input" : "custom-file-input"} onChange={handleFileChange} type="file" required />
                     <label className="custom-file-label">{label}</label>
                  </div>
                  {
                     isInvalid && (
                        <div className="invalid">
                           {isInvalid.message}
                        </div>
                     )
                  }
               </Form.Group>
               <hr />
               <Button disabled={isInvalid} type="submit" >submit</Button>
            </Form >
         </Modal>

         <Card>
            <Card.Body>
               <div className="aspect-ratio-box">
                  <div className="aspect-ratio-box-inside">
                     <div className="flexbox-centering">
                        {/* <div className="viewport-sizing"> */}
                        {/* <h5 className="aspect-title">{title}</h5> */}
                        {img ? (

                           <img className="aspect-image" src={img} alt="After" />
                        ) : (
                              <div className="aspect-dummy"></div>
                           )}
                        <div className="aspect-form-box">
                           <Button className="aspect-form-edit" onClick={handleOpen}>Edit Photo</Button>
                           {img && <Button className="aspect-form-remove" variant="danger" onClick={onRemove}>Remove Photo</Button>}
                        </div>
                        {/* </div> */}
                     </div>
                  </div>
               </div>
               <hr />
               <Card.Title className="text-center mt-3 mb-0">{title}</Card.Title>
               {error && <Alert variant="warning">{error.message}</Alert>}
            </Card.Body>
         </Card>
      </>
   )
}

export default memo(ImageUpload);