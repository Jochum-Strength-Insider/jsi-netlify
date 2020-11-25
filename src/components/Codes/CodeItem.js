import React, { useState } from "react";

import Modal from '../Modal';
import CodeForm from './CodeForm';
import Button from 'react-bootstrap/Button';
import HoverButton from '../HoverButton';

const CodeItem = ({ code, onSetRemoveCodeKey, onEditCode, setActive }) => {

  const [editMode, setEditMode] = useState(false);


  const onToggleEditMode = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  };

  const handleClose = () => {
    setEditMode(false);
  }

  return (
    <>
      <Modal show={editMode} handleClose={handleClose} heading={code.title}>
        <CodeForm code={code} onEditCode={onEditCode} handleClose={handleClose} />
      </Modal>

      <span>
        <strong className="mr-2">{code.title}</strong>
        {!code.active
          ? <HoverButton variant={"outline-warning"} text={"Inactive"} hoveredText={"Activate"} onClick={setActive(code.cid, true)} />
          : <HoverButton variant={"outline-success"} text={"Active"} hoveredText={"Deactivate"} onClick={setActive(code.cid, false)} />
        }
      </span>

      <span>
        <>
          <Button className="ml-2" variant="outline-primary" onClick={onToggleEditMode}>Details</Button>

          <Button className="ml-2" variant="outline-danger"
            type="button"
            onClick={() => onSetRemoveCodeKey(code)}
          >
            Delete
          </Button>
        </>
      </span>
    </>
  )
}


export default CodeItem;