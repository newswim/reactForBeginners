// @flow

import React from 'react'
import { getFunName } from '../helpers'

class StorePicker extends React.Component {
  // constructor () {
  //   super()
  //   this.goToStore = this.goToStore.bind(this)
  // }
  goToStore (event) {
    event.preventDefault()
    // first, grab the text from the input field
    let storeId = this.storeInput.value
    console.log(`Going to ${storeId}!`)
    // second, transition to route from / to store/:storeId
    this.context.router.transitionTo(`/store/${storeId}`)
  }

  // --- render -- is the only method which is automatically bound to component
  render() {
    return (
      <form className="store-selector" onSubmit={(event) => this.goToStore(event)}>
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name"
               defaultValue={getFunName()} ref={(input) => this.storeInput = input} />
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}


// Make the router available to our component

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker
