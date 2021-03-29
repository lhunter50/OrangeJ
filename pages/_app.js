// import App from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/antd.css";
import '@stripe/stripe-js'
import Head from 'next/head'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_wz1wfpLLjTwkJHaP8e28vF7600FYaGbR0Q");


function MyApp({ Component, pageProps }) { // title is for dev purposes  


  return (
    <Elements stripe={stripePromise}>
      <Head>
        <title>reps</title>
      </Head>
      <Component {...pageProps} />
    </Elements>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp