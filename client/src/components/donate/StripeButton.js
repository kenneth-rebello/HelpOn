import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { updateWallet } from '../../firebase/firebase.utils';

const StripeButton = ({ price, user }) => {

    const priceForStripe = parseInt(price)*100;
    const publishableKey = 'pk_test_eJEh8Ae2IMY6e4AIwpOp6IFF00aLotrRau';

    const onToken = token => {

        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token: token
            }
        }).then(response => {
            alert('Payment Successful')
        }).catch(error => {
            console.log(JSON.stringify(error))
        })

        updateWallet(user, price)
    }

    return (
        <StripeCheckout
            label="Pay Now"
            name="Crown Clothing"
            billingAddress
            shippingAddress
            image={""}
            amount={priceForStripe}
            panelLabel="Donate"
            token={onToken}
            stripeKey={publishableKey}
            currency="INR"
        />
    )
}

export default StripeButton 