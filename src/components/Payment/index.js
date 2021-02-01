import React, { useState, useEffect } from 'react';
import jochumJoin from "../../images/jochum-join.jpg";
import PaymentButton from './button';
import Spinner from 'react-bootstrap/Spinner';

import { useLocation } from "react-router-dom";
import { withFirebase } from '../Firebase';
import './styles.css';

import {
  Button,
  InputGroup,
  Form,
  Row,
  Col,
  FormLabel,
  FormControl
} from 'react-bootstrap';

// auto add discount through url
// Reorganize
// Create a more consistent checkout flow pattern
// Add a negative reaction if the discount code didn't work
// The Subscription Id field in create code shouldnt' have default text. Just a placeholder.

// Mobile responive so the paypal button never goes off the bottom of the page.

// Add this disclaimer "Discount code applies to first payment period only, after the initial period the cost of your program will revert back to regular price" or something along those lines.Right now it just looks like it's a constant discount.


// Make the checkout a fixed footer on mobile?
// const AppFooter = ({ children }) => {
//   return (
//     <div className="fixed-bottom">
//       <Container>
//         {children}
//       </Container>
//     </div>
//   )
// }

const PromoCodeDiscount = ({ variant, isDisabled, giveDiscount }) => {
  const [promo, setPromo] = useState('');
  const [open, setOpen] = useState(false);

  const onChange = (e) => {
    setPromo(e.target.value);
  }

  const toggleOpen = () => setOpen(!open);

  const applyDiscount = (e) => {
    e.preventDefault();
    giveDiscount(promo);
  }

  return (
    <div>
      <div>
        <Row className="show-grid mb-3">
          <Col md={12}>
            <Form>
              <FormLabel
                onClick={toggleOpen}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                className='sr-only sr-only-focusable'
              >Promo Code</FormLabel>{' '}
              {/* <Button
                className="promo-code-button px-0 my-0"
                variant={"link"}
                onClick={toggleOpen}
              >
                {!open ? `Apply ` : `Hide `}
                promo code {!open ? `+` : `-`}
              </Button>
              <Collapse in={open}> */}
              <InputGroup>
                <FormControl
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  type="text"
                  placeholder="Enter promo code"
                  value={promo}
                  onChange={onChange}
                  disabled={isDisabled}
                />
                <InputGroup.Append>
                  <Button
                    variant={variant}
                    className="btn-round px-3"
                    type="submit"
                    disabled={isDisabled}
                    onClick={applyDiscount}
                  >Apply</Button>
                </InputGroup.Append>
              </InputGroup>
              {/* </Collapse> */}
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const Payment = ({ codes, saveDetails, referral, discount, loading }) => {
  // const [giveDiscount, setGiveDiscount] = useState(false);
  const [planId, setPlanId] = useState('P-0RD73155P7242302GL66FXOI');
  const [description, setDescription] = useState('Online Programming')
  const [cid, setCid] = useState(null);
  const [sendReferral, setSendReferral] = useState(null);
  const [amount, setAmount] = useState(50);
  const [paid, setPaid] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(null);

  const discountCodes = codes.map(code => code.distountCode);
  // console.log("discountCodes: ", discountCodes);

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
        setPaid(true);
        if (cid) {
          // console.log("cid saved");
          saveDetails(cid, details);
        }
        if (sendReferral) {
          // console.log("cid saved");
          saveDetails(sendReferral, details);
        }
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
      // console.log(index);
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


  return (
    <>
      <div className="sign-up">
        <img
          className="d-block w-100"
          src={jochumJoin}
          alt="Insider Sign Up"
        />

        <div className="sign-up-info-contain">
          <div className="sign-up-info">
            {paid ? <Approved /> : <InsiderDetails />}

            {/* <a className="sign-up-button" target="_blank" rel="noreferrer noopener" href="https://www.powr.io/apps/paypal-button/view?id=21034953&mode=page&transaction_id=4977048">Sign Up!</a> */}

            {/* <AppFooter> */}
            {
              !paid &&
              <>
                <div className="d-flex justify-content-between">
                  <h3>Total:</h3>
                  <h3>
                    ${amount}*
                    {/* <OverlayTrigger
                      placement="left"
                      overlay={
                        <Tooltip id={`tooltip`}>
                          <p><i>This program will be automatically charged every three weeks until you decide to cancel.</i></p>
                          {discountApplied && <><p><i>Discount code applies to first payment period only, after the initial period the cost of your program will revert back to regular price - $50.</i></p></>}
                        </Tooltip>
                      }
                    >
                      <div>${amount}*</div>
                    </OverlayTrigger>*/}
                  </h3>
                </div>

                {discountApplied && <div className='discount-code text-right'>{discountApplied}</div>}

                <div>
                  <PromoCodeDiscount giveDiscount={giveDiscountHandler} />
                  <hr style={{ backgroundColor: "white" }} />
                  {/* {!processing ? */}
                  {/* {true ?
                  (loading && <PaymentButton createSubscription={onSubscribe} onCancel={onCancel} createOrder={createOrder} onApprove={onApprove} onError={onError} amount={amount} />)
                  : <Button variant="primary" className="py-2" block disabled>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    {" "}Processing...
                </Button>
                } */}

                  {loading ?
                    <PaymentButton createSubscription={onSubscribe} onCancel={onCancel} createOrder={createOrder} onApprove={onSubscriptionApproved} onError={onError} amount={amount} />
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
                </div>
              </>
            }
            {/* </AppFooter> */}
          </div>
        </div>
      </div>
    </>
  )
}

const InsiderDetails = () => (
  <>
    <h2 className="sign-up-title text-center">Jochum Strength Insider</h2>
    <p className="includes">Includes:</p>
    <ul>
      <li>New Program Every 3 Weeks</li>
      <li>Individualized Training Program</li>
      <li>Jochum Strength Nutrition Plan</li>
      <li>Weekly Check Ins With A Jochum Strength Coach</li>
    </ul>
    <p className="once">Once You Sign Up you will be emailed by Coach Jochum and the programming process will begin!</p>

    <p className="info mb-2"><i>* This program will be automatically charged every three weeks until you decide to cancel.</i></p>
    <p className="info"><i>*Discount codes apply to first payment period only, after the initial period the cost of your program will revert back to regular price.</i></p>
  </>
);

const Approved = () => (
  <>
    <h3>Subscription Complete</h3>
    <p>Thank you for subscribing to Jochum Strength Insider! A Jochum Strength coach will reach out to you via email to provide access to Jochum Strength Insider and begin the programming proccess.</p>
  </>
);

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const PaymentPage = ({ firebase }) => {
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

          // console.log(codesArray);
          setCodes(codesArray);
        }
      });
      setLoading(false);
    }
    fetchCodes();

    return () => {
      firebase.codes().off();
    }
  }, [firebase]);

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
    <Payment codes={codes} loading={loading} saveDetails={saveDetails} referral={URLReferralCode} discount={URLDiscountCode} />
  )
};

export default withFirebase(PaymentPage);