import React from 'react';
import {ElementsConsumer, CardElement, CardNumberElement, CardExpiryElement } from '@stripe/react-stripe-js';
import { functions, db, auth } from './../firebase/index'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#000000",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

class CardForm extends React.Component {
  handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    const {stripe, elements, stripeId} = this.props
    

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement)
    const result = await stripe.createToken(cardNumberElement, {currency: "CAD"})

    const createCard = functions.httpsCallable("createCard")
    await createCard({token: result.token, stripeId: stripeId}).then(r => {
      console.log(r)
    })
  };



  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardNumberElement options={CARD_ELEMENT_OPTIONS}/>
        <CardExpiryElement options={CARD_ELEMENT_OPTIONS}/>
        <button type="submit" disabled={!this.props.stripe}>Add Card</button>
      </form>
    );
  }
}

export default function InjectedCheckoutForm(props) {
  return (
    <ElementsConsumer>
      {({stripe, elements}) => (
        <CardForm stripe={stripe} stripeId={props.stripeId} elements={elements} />
      )}
    </ElementsConsumer>
  );
}