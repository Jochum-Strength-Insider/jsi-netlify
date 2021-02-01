import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { withFirebase } from '../../Firebase';
import PromoCodeDiscount from './PromoButton';
import PaymentButton from './PaymentButton';

import { useLocation } from "react-router-dom";

import {
  Button,
} from 'react-bootstrap';

const Payment = ({ codes, saveDetails, referral, discount, loading, back, stepSubmit }) => {
  const defaultAmount = 50;
  const [planId, setPlanId] = useState('P-0RD73155P7242302GL66FXOI');
  const [description, setDescription] = useState('Online Programming')
  const [cid, setCid] = useState(null);
  const [sendReferral, setSendReferral] = useState(null);
  const [amount, setAmount] = useState(defaultAmount);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountFailed, setDiscountFailed] = useState(false);

  const discountCodes = codes.map(code => code.distountCode);

  useEffect(() => {
    const initialDiscount = (promoCode) => {
      if (promoCode !== "") {
        const index = discountCodes.indexOf(promoCode.trim().toLocaleLowerCase());
        if (index !== -1) {
          const { subscriptionId, price, title, cid, codeType } = codes[index];
          const discounted = parseInt(price);
          if (codeType === "referral") {
            setSendReferral(cid);
          }
          if (price < amount) {
            setCid(cid);
            setPlanId(subscriptionId);
            setDescription(title);
            setDiscountApplied(title);
            setAmount(discounted.toFixed());
          }
        }
      }
    };

    if (referral) {
      initialDiscount(referral)
    };
    if (discount) {
      initialDiscount(discount)
    }
  }, [referral, discount, amount, codes, discountCodes]);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: description,
          amount: {
            value: amount,
          },
        },
      ],
    });
  };

  const onSubscribe = (data, actions) => {
    console.log("planId", planId);
    return actions.subscription.create({
      'plan_id': planId,
    });
  };

  const onSubscriptionApproved = (data, actions) => {
    console.log("approved: ", data.subscriptionID);
    return actions.subscription.get().then(function (details) {
      if (details.error === 'INSTRUMENT_DECLINED') {
        console.log("declined");
        return actions.restart();
      } else {
        if (cid) {
          saveDetails(cid, details);
        }
        if (sendReferral) {
          saveDetails(sendReferral, details);
        }
        stepSubmit()
      }
    });
  }

  // const onApprove = (data, actions) => {
  //   return actions.order.capture().then(function (details) {
  //     if (details.error === 'INSTRUMENT_DECLINED') {
  //       return actions.restart();
  //     } else {
  //       setPaid(true);
  //       if (cid) {
  //         saveDetails(cid, details);
  //       }
  //       if (sendReferral) {
  //         saveDetails(sendReferral, details);
  //       }
  //     }
  //   });
  // };

  const onCancel = (data) => {
    console.log("cancelled");
  }

  const onError = (err) => console.log(err);

  const giveDiscountHandler = (promoCode) => {
    if (promoCode !== "") {
      const index = discountCodes.indexOf(promoCode.trim().toLocaleLowerCase());
      if (index !== -1) {
        const { subscriptionId, price, title, cid, codeType } = codes[index];
        const discounted = parseInt(price);
        setDiscountFailed(false);
        if (codeType === "referral") {
          setSendReferral(cid);
        }
        if (price < amount) {
          setCid(cid);
          setPlanId(subscriptionId);
          setDescription(title);
          setDiscountApplied(title);
          setAmount(discounted.toFixed());
        }
      } else {
        setDiscountFailed(true);
      }
    }
  };

  return (
    <>
      <div className="mb-4">
        <ul className="list-group mb-3">
          <li className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 className="my-0">Insider Subscription</h6>
              <small className="text-muted">Three Week Program *</small>
            </div>
            <span className="text-muted">$50</span>
          </li>
          {
            discountApplied && <>
              <li className="list-group-item d-flex justify-content-between bg-light">
                <div className="text-success">
                  <h6 className="my-0">Promo code</h6>
                  <small>{discountApplied}</small>
                </div>
                <span className="text-success">-${parseInt(defaultAmount - amount)}</span>
              </li>
            </>
          }
          <li className="list-group-item d-flex justify-content-between">
            <span>Total (USD)</span>
            <strong>${amount}*</strong>
          </li>
        </ul>
      </div>
      <PromoCodeDiscount giveDiscount={giveDiscountHandler} discountApplied={discountApplied} discountFailed={discountFailed} />
      <hr />

      <div className="text-dark">
        <Button className="px-0 py-0 mb-2" variant="link" onClick={() => back()}>Click here to edit Sign Up Details.</Button>
        <p><i>Insider account details do not need to match PayPal information.</i></p>
      </div>

      <hr />

      <h3 className="mb-3">Payment</h3>

      {/* <div className="d-flex justify-content-center"> */}
      <div>
        {loading ?
          <>
            <PaymentButton createSubscription={onSubscribe} onCancel={onCancel} createOrder={createOrder} onApprove={onSubscriptionApproved} onError={onError} amount={amount} />
          </>
          : <Button variant="primary" className="py-2" block disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            {" "}Loading...
            </Button>

        }
        <PaymentDetails />
      </div>
      {/* </div> */}
    </>
  )
};

const PaymentDetails = () => (
  <>
    <p className="info mb-2 text-dark"><i>* This program will be automatically charged every three weeks until you decide to cancel. Discount codes apply to first payment period only, after the initial period the cost of your program will revert back to regular price.</i></p>
  </>
)

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const PaymentPage = ({ firebase, back, stepSubmit }) => {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(false);

  const query = useQuery();

  const URLDiscountCode = query.get("discount");
  const URLReferralCode = query.get("ref");

  useEffect(() => {
    const fetchCodes = () => {
      firebase.codes().orderByChild("active").equalTo(true).on("value", (snap) => {
        setLoading(true);
        const codesObject = snap.val();

        if (codesObject) {
          const codesList = Object.keys(codesObject);
          const codesArray = codesList.map(key => {
            const { distountCode, ...rest } = codesObject[key];
            return {
              cid: key,
              distountCode: distountCode.toLowerCase(),
              ...rest,
            }
          });

          setCodes(codesArray);
        }
      });
      setLoading(false);
    }
    fetchCodes();

    return () => {
      firebase.codes().off();
    }
  }, [firebase, stepSubmit]);

  const saveDetails = (cid, details) => {
    const { id, create_time, subscriber, plan_id } = details;
    const { email_address, name } = subscriber;

    const detailsObject = {
      'transaction_id': id,
      'plan_id': plan_id,
      'create_time': create_time,
      "email_address": email_address,
      "user": `${name.surname}, ${name.given_name}`,
    }

    firebase
      .codeDetail(cid)
      .child('submissions')
      .push(detailsObject)
  }

  return (
    <Payment codes={codes} loading={loading} saveDetails={saveDetails} referral={URLReferralCode} discount={URLDiscountCode} back={back} stepSubmit={stepSubmit} />
  );
};

export default withFirebase(PaymentPage);