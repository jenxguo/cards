import React from 'react';
//import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect, isLoaded} from 'react-redux-firebase';

//keys returned are prop names, values are prop values
//taken data from redux global store !!!!!
//this function takes PRECEDENCE over props that are passed in, if u pass props to Test Component
//will be MERGED with the redux store, but redux store will take precedence if same name
//depends on internet time! NEED TO WAIT UNTIL DATA IS LOADED INTO REDUX FIRST OTHERWISE WILL BE EMPTY

const mapStateToProps = state => {
  console.log(state);
  const flashcards = state.firebase.data.flashcards;
  const isEmpty = state.firebase.profile.isEmpty;
  return { flashcards: flashcards};
}

//return loading screens!!!
const Test = props => {
  if (!isLoaded(props.flashcards)) {
    return <div>Loading...</div>
  }
  return <div>{props.flashcards.deck1.name}</div>;
}

//list is the paths u want to grab
//compose it so it looks better
export default compose(firebaseConnect(['/flashcards']), (connect(mapStateToProps)))(Test);
