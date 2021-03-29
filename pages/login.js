import React from 'react'
import Link from 'next/link'
import { auth, firebase } from './../firebase/index'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import withoutAuth from './../helpers/withoutAuth'

class Login extends React.Component {


  render() {
    let uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
      signInSuccessUrl: '/',
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ]
    };

    return (
      <div>
        <h2>Sign In / Sign Out</h2>
        <p>
          Sign up now, or sign in to Orange Jacket
        </p>
        <div id="firebaseui-auth-container">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
        </div>
        <Link href="/"><a>Back home</a></Link>
      </div>
    )
  }
}
export default withoutAuth(Login)