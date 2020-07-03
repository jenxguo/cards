import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import Homepage from './Homepage';
import Nav from './Nav';
import PageRegister from './PageRegister';
import PageLogin from './PageLogin';
import './App.css';

import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux';
import {isLoaded} from 'react-redux-firebase';

const App = props => {
  if (!isLoaded(props.auth, props.profile)) {
    return <div>Authentication Loading...</div>
  }

  //with just routes, info doesn't save when u go from page to page and the button to go to page doesn't work yet
    return (
      <Switch>
        <Route exact path="/">
          <div className="App">
            <Nav/>
            <Homepage uid={props.auth.uid}/>
          </div>
        </Route>
        <Route exact path="/editor">
          <div className="App">
            <Nav/>
            <CardEditor uid={props.auth.uid}/>
          </div>
        </Route>
        <Route exact path="/register">
          <div className="App">
            <PageRegister/>
          </div>
        </Route>
        <Route exact path="/login">
          <div className="App">
            <PageLogin/>
          </div>
        </Route>
        <Route path="/viewer/:deckId">
          <div className="App">
            <Nav/>
            <CardViewer/>
          </div>
        </Route>
        <Route>
          <div>Page not found!</div>
        </Route>
      </Switch>
    );
  }

const mapStateToProps = state => {
  return {auth: state.firebase.auth, profile: state.firebase.profile};
};

export default connect(mapStateToProps)(App);
