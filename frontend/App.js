import 'regenerator-runtime/runtime'
import React from 'react'

import './assets/css/global.css'

import {login, logout} from './assets/js/near/utils'
import getConfig from './assets/js/near/config'


export default function App() {
  if (!window.walletConnection.isSignedIn()) {
    return (
      <main>
        <h1>
          <label
            htmlFor="greeting"
            style={{
              color: 'var(--secondary)',
              borderBottom: '2px solid var(--secondary)'
            }}
          >
          
          </label>
          Welcome to Dandelion app!
        </h1>
        <p>
        Welcome to Dandelion app. Unfortunatelly frontend is still under development, to access contracts please use CLI. Thank you
        </p>
        
        <p style={{ textAlign: 'center', marginTop: '2.5em' }}>
          <button onClick={login}>Sign in</button>
        </p>
      </main>
    )
  }

  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <>
      <button className="link" style={{ float: 'right' }} onClick={logout}>
        Sign out
      </button>
      <main>
        <h1>
          <label
            htmlFor="greeting"
            style={{
              color: 'var(--secondary)',
              borderBottom: '2px solid var(--secondary)'
            }}
          >
            {/* {greeting} */}
          </label>
          {' '/* React trims whitespace around tags; insert literal space character when needed */}
          "Welcome to Dandelion"
        </h1>
        <form onSubmit={async event => {
          event.preventDefault()

          // get elements from the form using their id attribute
          //const { fieldset, greeting } = event.target.elements

          // hold onto new user-entered value from React's SynthenticEvent for use after `await` call
          //const newGreeting = greeting.value

          // disable the form while the value gets updated on-chain
          fieldset.disabled = true

        
          // show Notification
          setShowNotification(true)

          // remove Notification again after css animation completes
          // this allows it to be shown again next time the form is submitted
          //
        }}>
          <fieldset id="fieldset">
           
            
          </fieldset>
        </form>
        <p>
        Welcome to Dandelion app. Unfortunatelly frontend is still under development, to access contracts please use CLI. Thank you
        </p>
        
      </main>
   
    </>
  )
}

// this component gets rendered by App after the form is submitted
function Notification() {
  const { networkId } = getConfig(process.env.NODE_ENV || 'development')
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`

  return (
    <aside>
     
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  )
}
