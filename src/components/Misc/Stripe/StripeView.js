import React from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm.js";
import styled from "styled-components";

const Stripe = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;

/**
 *
 * StripeProvider comes from stripe and is required per stripe's documentation.
 * https://stripe.com/docs/recipes/elements-react
 * The Stripe apiKey is how the child components interact with your specific
 * stripe account. Make sure to change the stripe key when you build your own stipe
 * account (note if you're using the production key or testing key).
 *
 */
function StripeView(props) {
  return (
    <StripeProvider apiKey="pk_test_Xm1i1PmTqLH8BAuD0hAhn3je00REWKtBJ6">
      {/* production key = pk_live_MPXtPBPZxYZEc2XRo3XLZoXV00O4i1z73y
      test key = pk_test_Xm1i1PmTqLH8BAuD0hAhn3je00REWKtBJ6 */}
      <Stripe>
        <Elements>
          <CheckoutForm />
        </Elements>
      </Stripe>
    </StripeProvider>
  );
}

export default StripeView;
