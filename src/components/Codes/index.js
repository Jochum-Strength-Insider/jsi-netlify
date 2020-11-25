import React, { useState, useEffect } from 'react';
import AddForm from './AddForm';
import CodeList from './CodeList';
import Modal from '../Modal';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

import { withFirebase } from '../Firebase';

const Codes = ({ firebase }) => {
  const [show, setShow] = useState(false);
  const [codes, setCodes] = useState(JSON.parse(localStorage.getItem('codes')) || [])
  const [removeKey, setRemoveKey] = useState(null);
  const [showRemove, setShowRemove] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCodes = () => {
      firebase.codes().on("value", (snap) => {
        const codesObject = snap.val();

        if (codesObject) {
          // console.log('queried')
          const codesList = Object.keys(codesObject);
          const codesArray = codesList.map(key => ({
            cid: key,
            ...codesObject[key],
          }));
          localStorage.setItem('codes', JSON.stringify(codesArray));
          setCodes(codesArray);
        } else {
          localStorage.removeItem('codes');
          setCodes([]);
          // setLoading(false);
        }
        // setLoading(false);
      });
    }
    fetchCodes();
    return () => {
      firebase.codes().off();
    }
  }, [firebase])

  const handleClose = () => {
    setShow(false);
  }

  const handleOpen = (e) => {
    e.preventDefault();
    setShow(true);
  }

  const handleRemoveClose = () => {
    setShowRemove(false);
    setRemoveKey(null);
  }

  const onSetRemoveCodeKey = (code) => {
    setShowRemove(true);
    setRemoveKey(code);
  }

  const onRemoveCode = () => {
    const { cid } = removeKey;
    firebase
      .code(cid)
      .remove()
      .then(firebase.codeDetail(cid).remove())
      .then(handleRemoveClose)
      .catch(setError(error));
  };

  const onEditCode = (code, codeUpdate) => {
    const { cid } = code;
    // const { tid, ...taskSnapshot } = task;
    // console.log(tid, taskSnapshot, taskUpdate);
    // firebase.task(tid).set({
    //    title: title,
    //    instruction,
    // });
    return firebase
      .code(cid)
      .set(codeUpdate)
  };

  const setActive = (cid, active) => () => {
    firebase.code(cid).update({ active: active })
  };

  return (
    <>
      <Modal handleClose={handleClose} show={show} heading={"Create Code"}>
        <AddForm handleClose={handleClose} />
      </Modal>

      {
        removeKey &&
        (<Modal handleClose={handleRemoveClose} show={showRemove} heading={"Remove " + removeKey.title + "?"}>
          <Form className="d-flex justify-content-between align-items-center">
            <Button variant="outline-danger" onClick={onRemoveCode}>Remove</Button>
            <Button variant="primary" onClick={handleRemoveClose}>Cancel</Button>
          </Form>
        </Modal>)
      }

      <ListGroup variant="flush" className="list-group-bordered mb-5">
        <ListGroup.Item>
          <Button onClick={handleOpen} block>Add Code</Button>
        </ListGroup.Item>
        {
          (codes.length > 0)
            ? (<CodeList codes={codes} onSetRemoveCodeKey={onSetRemoveCodeKey} onEditCode={onEditCode} setActive={setActive} />)
            : (<ListGroup.Item>No Codes...</ListGroup.Item>)
        }
      </ListGroup>
    </>

  )
}


export default withFirebase(Codes);