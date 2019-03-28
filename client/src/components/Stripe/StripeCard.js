import React from 'react'
import { CardElement, injectStripe, Elements } from 'react-stripe-elements';

function StripeCard(){
    return(
        <Elements>
        <CardElement style={{ base: { fontSize: '18px' } }} />				
    </Elements>

    )
}

export default injectStripe(StripeCard)