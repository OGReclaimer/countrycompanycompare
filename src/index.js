import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Redux Config
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import reducers from "./reducers/index"
import thunk from "redux-thunk"

// Firebase/Firestore Config
import firebase from 'firebase';
import 'firebase/firestore';

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

var config = {
    apiKey: "AIzaSyC4vre6rRV7j_VNFipoNj7DeGuSe6z8QT8",
    authDomain: "companies2economies.firebaseapp.com",
    databaseURL: "https://companies2economies.firebaseio.com",
    projectId: "companies2economies",
    storageBucket: "companies2economies.appspot.com",
    messagingSenderId: "788140992143"
  };

  // Initialize an instance of the app with firebase
  firebase.initializeApp(config);
  // Initialize firestore
  firebase.firestore();


ReactDOM.render(
    <Provider store={store}>    
        <App />
    </Provider>
,document.getElementById('root'));
registerServiceWorker();

// EXPORTS
export const db = firebase.firestore()
export const storage = firebase.storage()
