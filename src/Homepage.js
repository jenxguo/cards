import React from 'react';
import './Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, withRouter} from 'react-router-dom';
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'redux';

const Homepage = props =>  {

  if (!isLoaded(props.names)) {
    return <div>Loading...</div>
  }

  if (isEmpty(props.names)) {
    return <div>Page not found</div>
  }

  const yours = Object.keys(props.names).map(id => {
    if (props.names[id]['owner'] == props.uid) {
      return (
        <div>
        <Link to={`/viewer/${id}`}>{props.names[id]['name']}</Link><br/>
        </div>
      );
    }
  })

  const pub = Object.keys(props.names).map(id => {
    if (!props.names[id]['private']) {
      return (
        <div>
        <Link to={`/viewer/${id}`}>{props.names[id]['name']}</Link><br/>
        </div>
      );
    }
  })

  return(
    <div className="homepage">
      <h2>Welcome!</h2>
      <h5>Create new flashcards with the <Link to="/editor">Card Editor</Link>.</h5>
      <br/>
      <h5>Your Card Decks:</h5>
      {yours}
      <br/>
      <h5>Public Card Decks:</h5>
      {pub}
    </div>
  )
}

const mapStateToProps = (state, props) => {
  return {
    names: state.firebase.data.homepage,
    email: state.firebase.auth.email,
    isLoggedIn: state.firebase.auth.uid
  };
}

export default compose(firebaseConnect(['/homepage']), (connect(mapStateToProps)))(Homepage);
