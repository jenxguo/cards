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

  const names = Object.keys(props.names).map(id => {
    return (
      <div>
      <Link to={`/viewer/${id}`}>{props.names[id]['name']}</Link><br/>
      </div>
    );
  })

  return(
    <div className="homepage">
      <h2>Welcome!</h2>
      <h5>Creating flashcards with the <Link to="/editor">Card Editor</Link>.</h5>
      <br/>
      <h5>Your Card Decks:</h5>
      {names}
    </div>
  )
}

const mapStateToProps = (state, props) => {
  const names = state.firebase.data.homepage;
  return { names: names};
}

export default compose(firebaseConnect(['/homepage']), (connect(mapStateToProps)))(Homepage);
