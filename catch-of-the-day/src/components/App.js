import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'

class App extends React.Component {
  constructor () {
    super()
    // initial state
    this.state = {
      fishes : {},
      order : {}
    }

    // binding methods
    this.loadSamples = this.loadSamples.bind(this)
    this.removeFromOrder = this.removeFromOrder.bind(this)
    this.addToOrder = this.addToOrder.bind(this)
    this.removeFish = this.removeFish.bind(this)
    this.updateFish = this.updateFish.bind(this)
    this.addFish = this.addFish.bind(this)
  }

  componentWillMount () {
    // this runs right before <App> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
                      {
                        context: this,
                        state: 'fishes'
                      })
    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`)

    if (localStorageRef) {
      // update our App component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUpdate (nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order))
  }

  componentWillUnmount () {
    base.removeBinding(this.ref)
  }

  addFish (fish) {
    // update state
    const fishes = {...this.state.fishes}
    const timestamp = Date.now()
    // add in our new fish
    fishes[`fish-${timestamp}`] = fish
    // set state    _ destructured
    this.setState({ fishes })
  }

  updateFish (key, updatedFish) {
    const fishes = {...this.state.fishes}
    fishes[key] = updatedFish
    this.setState({ fishes })
  }

  removeFish (key) {
    // make a copy
    const fishes = {...this.state.fishes}
    // set the entry to null
    // note: using `delete` won't work (with firebase)
    fishes[key] = null
    // update state
    this.setState({ fishes })
  }

  loadSamples () {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder (key) {
    // make copy of state
    const order = {...this.state.order}
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1
    // update our state
    this.setState({ order })
  }

  removeFromOrder (key) {
    const order = {...this.state.order}
    // remove order
    delete order[key]
    this.setState({ order })
  }

  render () {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish
                                key={key}
                                index={key}
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        <Order
          removeFromOrder={this.removeFromOrder}
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params} />
        <Inventory
          addFish={this.addFish}
          removeFish={this.removeFish}
          updateFish={this.updateFish}
          removeFromOrder={this.removeFromOrder}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes} />
      </div>
    )
  }
}

export default App
