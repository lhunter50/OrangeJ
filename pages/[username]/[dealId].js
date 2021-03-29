import React from 'react'
import { auth, db, functions } from '../../firebase/index'
import { Divider, Spin, Button } from 'antd'
import {CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import { useRouter } from 'next/router'

const MySpinner = () => <Spin />

class ListingCheckout extends React.Component {
  state = {
    clientSecret: undefined,
    loading: true,
  }

  handleSubmit = async (event) => {
    console.log("submit")
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    const {stripe, elements} = this.props

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(this.state.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Julien Martel',
        },
      }
    });


    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        console.log("success!!")
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  checkoutInformation = async () => {
    const x = this
    async function deal() {
      return db.doc("listings/" + x.props.dealId).get().then(function(doc) {
        return doc.data()
      }).catch(e => console.log(e))
    } 

    async function user() {
      return db.collection('reps').where("username", "==", x.props.username).get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }  
          
          const data = snapshot.docs[0].data() // should only be one
          console.log(data)
          return data.uid
        })
    } 

    return {deal: await deal(), repId: await user() }
  }

  componentDidMount() {
    const x = this
    const payIntent = functions.httpsCallable('payIntent');

    this.checkoutInformation().then(info => {
      const deal = info.deal
      const repId = info.repId
      console.log(info)
      // console.log(deal)
      x.setState({ deal, loading: false })

      const quantity = 1 // change this so that it gets a new payment intent every time this changes
      
      return payIntent({listingId: deal.id, repId, quantity }) // add rep id here from router query
    }).then(result => {
      console.log(result)
      x.setState({clientSecret: result.data.client_secret})
    }).catch(e => console.log(e))
  }

  isLoaded = () => {
    const CARD_ELEMENT_OPTIONS = {
      style: {
        base: {
          color: "#32325d",
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

    return (
      <>
          <div className="masterDiv">
            <div className="mainContent">
              <div className="dealContent ">
                <div className="dealHeader">
                  <h1 id="dealTitle">{this.state.deal.title}</h1>
                  <h3 id="dealSubtitle">Deal Subtitle</h3>
                  <h5 id="merchantAddress">Merchant Address Goes Here</h5>
                </div>
                <img src="http://placekitten.com/800/400" />
                <div className="aboutDeal">
                  <div className="dealDetails">
                    <h3>Details</h3>
                    <p>{this.state.deal.description}</p>
                  </div>
                  <div className="additionalInfo">
                    <h3>Additional Information</h3>
                    <p></p>
                  </div>
                  <div>
                    <h3>About SomeCompany</h3>
                    <p>{this.state.deal.textLine}</p>
                  </div>
                  <div className="finePrint">
                    <h3>Fine Print</h3>
                    <p>This deal expires in 12 days, Refundable within 15 days of purchase, subject to whatever.
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur
                    </p>
                  </div>
                </div>
              </div>
              <div className="purchaseInfo">
                <h3 id="prices">
                  <span style={{textDecoration: "line-through"}}>${this.state.deal.originalPrice}</span>
                  <span style={{color: "green", marginLeft: "15px"}}>${this.state.deal.newPrice}</span>
                  <div style={{color: "red",}}>{this.state.deal.percentOff}% OFF!</div> 
                </h3>
                <div>
                <Divider>Checkout</Divider>
                  
                  {/* credit card here */}
                  <form onSubmit={this.handleSubmit}>
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                    <input
                      style={{width: "90%", padding: "10px", margin: "20px 10px"}} 
                      type="email" 
                      placeholder="email to send voucher"
                    ></input>
                    <input type="submit" style={{margin: "5px",}} id="button" defaultValue="Buy now!"/>
                  </form>
                  
                  <Divider></Divider>
                </div>
              </div>
            </div>
          </div>
          <style jsx>{`
            :global(body, html) {
              margin: 0;
              padding: 0;
            }
            
            .masterDiv {
              margin-top: 20px;
            }
  
            .dealHeader {
              border-bottom: 2px solid black;
              margin-bottom: 20px;
            }
  
            #dealTitle, #dealSubtitle {
              margin: 0;
            }
  
            .mainContent {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
            }
  
            .dealContent {
              margin-bottom: 20px;
              padding: 12px;
              width: 830px;
              border-bottom: 2px solid black;
            }
  
            .dealContent img {
              border-radius: 4px;
            }
  
            .aboutDeal {
              margin-top: 20px;
            }
  
            .purchaseInfo {
              height: 600px;
              width: 600px;
              border: 2px solid;
              margin-left: 20px;
              margin-bottom: 20px;
              padding: 12px;
              position: sticky;
              top: 147px;
            }
  
            p {
              font-size: 16px;
            }
          `}</style>
        </>
    )
  }

  render() {

    if (this.state.loading) {
      return MySpinner()
    } else {
      return (
        this.isLoaded()
      )
    }
    
  }
}

export default function InjectedCheckoutForm() {
  const router = useRouter()
  const { dealId, username } = router.query

  if (dealId && username) {
    return (
      <ElementsConsumer>
          {({stripe, elements}) => (
            <ListingCheckout dealId={dealId} username={username} stripe={stripe} elements={elements} />
          )}
      </ElementsConsumer>
    );
  } else {
    return MySpinner()
  }
}