import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// const CLIENT_ID = process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

const clientIdSub = "AUtHx8LjACyuQA5L2DM5zMmQu1uNq4-6XCOS-nMNYbH-18WAliXicS3dvdSfML74E9hqrGN-3PCA7PHB&vault=true&intent=subscription";
// const clientIdSubTest = "Adbfuon92JCZrJgEfTOK6QKkKVRLLJMQE7LTuB-jAUSkuP27i-s9DI3_XVUsZALqy8HmrEA2bjYRLVjh";

const PaymentButton = ({ createOrder, onApprove, onError, onCancel, createSubscription }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": clientIdSub }}>
      <PayPalButtons createSubscription={createSubscription} onCancel={onCancel} onError={onError} onApprove={onApprove} style={{ layout: "horizontal", }} />
      {/* <PayPalButtons createOrder={createOrder} onCancel={onCancel} onError={onError} onApprove={onApprove} style={{ layout: "horizontal", }} /> */}
    </PayPalScriptProvider>
  );
}

export default PaymentButton;
