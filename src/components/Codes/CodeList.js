import React from 'react';
import CodeItem from './CodeItem';

import ListGroup from 'react-bootstrap/ListGroup';

import './style.css';

const CodeList = ({ onSetRemoveCodeKey, codes, onEditCode, setActive }) => {
  return (
    <>
      { codes.map(code => (
        <ListGroup.Item className="d-flex justify-content-between align-items-center" key={code.cid}>
          <CodeItem
            code={code}
            onSetRemoveCodeKey={onSetRemoveCodeKey}
            onEditCode={onEditCode}
            setActive={setActive}
          />
        </ListGroup.Item>
      ))}
    </>
  )
};

export default CodeList;