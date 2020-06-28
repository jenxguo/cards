import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import Homepage from './Homepage';
import Nav from './Nav';
import './App.css';

import {Switch, Route} from 'react-router-dom'

const App = () => {

  //with just routes, info doesn't save when u go from page to page and the button to go to page doesn't work yet
    return (
      <Switch>
        <Route exact path="/">
          <div className="App">
            <Nav/>
            <Homepage/>
          </div>
        </Route>
        <Route exact path="/editor">
          <div className="App">
            <Nav/>
            <CardEditor/>
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

export default App;
