import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID || process.env.REACT_APP_DEV_PAYPAL_CLIENT_ID

const PaymentButton = ({ createOrder, onApprove, onError, onCancel, createSubscription }) => {
  const style = {
    color: 'white',
    label: 'subscribe',
    layout: 'horizontal',
    shape: 'pill',
    tagline: false,
  }

  return (
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
      <PayPalButtons createSubscription={createSubscription} onCancel={onCancel} onError={onError} onApprove={onApprove} style={style} />
    </PayPalScriptProvider>
  );
}

export default PaymentButton;