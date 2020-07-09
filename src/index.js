import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import { createStore, combineReducers, compose } from 'redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase'
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyAu8svtFE47WsWaIJGfptFhvjfenqnL3ZE",
  authDomain: "bootcamp-754eb.firebaseapp.com",
  databaseURL: "https://bootcamp-754eb.firebaseio.com",
  projectId: "bootcamp-754eb",
  storageBucket: "bootcamp-754eb.appspot.com",
  messagingSenderId: "981220265505",
  appId: "1:981220265505:web:8dd0d2975b11fe0b6b5d60"
};

firebase.initializeApp(firebaseConfig);
//saying we are currently using an emulator to test functions, so look at 5001 for cloud functions
//firebase.functions().useFunctionsEmulator('http://localhost:5001')

// Add firebase to reducers
//says HOW to store information in the redux store
const rootReducer = combineReducers({
  firebase: firebaseReducer
  // firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
//compose w/ dev tools just lets u peek into the store in chrome
const store = createStore(rootReducer, composeWithDevTools())

//simplest, starter configuration, store users under userProfile
// react-redux-firebase config
const rrfConfig = {
  preserveOnLogout: ['homepage'],
  userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
}

//giving access for react firebase to STORE data into redux
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  // createFirestoreInstance // <- needed if using firestore
}

//provider provides access to redux store, give react app access to communicate w/ redux store
//... means we are spreading rrfprops instead of the whole thing, use spread operator to keep all props TOGETHER
//so easier to change configs
ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>, document.getElementById('root')
);
