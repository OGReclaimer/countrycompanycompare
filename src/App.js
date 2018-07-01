import React, { Component } from 'react';
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import * as actions from "./actions/index"

//Firebase Reference
import { db, storage } from "./index"

//Map
import Map from "./map"

class App extends Component {
 
  constructor(props){
    super(props)
    this.state = {
      input: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {

    if (this.props.loading.loading === true){
      return(
        <div className="container">
          <h1 className="heading-primary"> Loading </h1>
        </div>
      )
    }
    else if (this.props.loading.loading === false) {
      let country = this.props.country.country
      let url = this.props.country.url
      return (
        <div>
          <div className="container">
            <h1 className="heading-primary">{country.country}</h1>
            <img style={{width: "100%", height:"100%"}} src={url}/>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="container">
          <h1 className="heading-primary"> Type in a profit to compare </h1>
            <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.input} onChange={event => this.handleInputChange(event.target.value)} />
              <input type="submit" value="Go!"/>
            </form>
            <Map/>
      </div>
      
      )
    }
}

  handleInputChange(value) {
    this.setState({input : value})
  }

  handleSubmit(event) {
    // Prevent Broswer from submitting form
    event.preventDefault()
    // Set Loading Flag to true
    this.props.load()
    // Change input from string to number
    let input = Number(this.state.input)
    // Grab "this" in class context
    let self = this
    // Search for country object with input
    fetchCountry(input)
    // Country Object feed into promise below \/
    .then((obj) => {
      // Save Country Object To State
      self.props.saveToState(obj)
      // Pass Country Object To SVG Function
      return getSvg(obj)
    })
    .then(function(svg){
      // Save SVG Url To State
      self.props.saveSVGToState(svg)
      // Set loading flag to false
      self.props.loaded()
    })
  }
}

//======================================================
//  FUNCTIONS
//======================================================

const fetchCountry = function(input){
  
  // (a) Fetch Relevant Master Array
  //==================================================
  var query = db.collection("IMF").doc("master").get()
    return query
  .then(function(doc){
    return doc.data().list
  })
  //==================================================

  // (b) Calculate Closest GDP Value To Input
  //==================================================
  .then(function(arr){
    let difference = Math.abs(input - arr[0])
    let closestValue = 0 
    arr.forEach(function(gdp){
      var newDifference = Math.abs(input - gdp)
      if (newDifference <= difference) {
          difference = newDifference
          closestValue = gdp
      }
    })
    return closestValue
  })
  //==================================================

  // (c) Fetch Country Object That Corressponds To GDP    
  //==================================================
  .then(function(closestvalue){
    var query = db.collection("IMF").doc(`${closestvalue}`).get()
    return query
  })
  .then(function(doc){
    return doc.data()
  })
  //==================================================
} 

const getSvg = function(obj) {

  // Fetch SVG Url From Storage
  //==================================================
  let country = obj.country
  let url = storage.refFromURL(`gs://companies2economies.appspot.com/country-svgs/${country}.svg`).getDownloadURL()
  return url
  //==================================================
}

function mapStateToProps(state) {
  return { 
    country: state.countryObject,
    loading: state.loading
   }
}

export default connect(mapStateToProps, actions)(App)
