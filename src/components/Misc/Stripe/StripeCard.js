import React from "react";
import { CardElement, Elements } from "react-stripe-elements";

//This is the for the individual cards in the checkout on the profile page.
function StripeCard() {
  return (
    <Elements>
      <CardElement style={{ base: { fontSize: "18px" } }} />
    </Elements>
  );
}

export default StripeCard;
