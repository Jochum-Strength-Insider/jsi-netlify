import React, { useState } from 'react';

import {
  Button,
  Form,
  FormControl
} from 'react-bootstrap';

const PromoCodeDiscount = ({ variant, isDisabled, giveDiscount, discountApplied, discountFailed }) => {
  const [promo, setPromo] = useState('');

  const onChange = (e) => {
    setPromo(e.target.value);
  }

  const applyDiscount = (e) => {
    e.preventDefault();
    giveDiscount(promo);
  }

  return (
    <div>
      <Form className="card p-2">
        <div className="input-group">
          <FormControl
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            type="text"
            placeholder="Enter promo"
            value={promo}
            onChange={onChange}
            disabled={isDisabled}
            isValid={discountApplied}
            isInvalid={discountFailed}
          />
          <div className="input-group-append">
            <Button
              variant={variant}
              className="btn-round px-3"
              type="submit"
              disabled={isDisabled}
              onClick={applyDiscount}
            >Apply</Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default PromoCodeDiscount;