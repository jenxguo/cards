import React from 'react';
import './Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, withRouter} from 'react-router-dom';
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'redux';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  //life cycle function, called immediately when component inserted into react tree, gonna get run immediately
  //external network requests here immediately
  //now u can just use getHomepage as a normal function!!! w/ homepage
  async componentDidMount() {
      const getHomepage = this.props.firebase.functions().httpsCallable('getHomepage');
      const homepage = await getHomepage();
      this.setState({homepage: homepage.data})
  }

  render() {
    if (!isLoaded(this.state.homepage)) {
      return <div>Loading...</div>
    }

    if (isEmpty(this.state.homepage)) {
      return <div>Page not found</div>
    }

    const visible = Object.keys(this.state.homepage).map(deckId => {
      const deck = this.state.homepage[deckId];
      return (
        <div key={deckId}>
        <Link to={`/viewer/${deckId}`}>{deck.name}</Link><br/>
        </div>
      );
    })

    return(
      <div className="homepage">
        <h2>Welcome!</h2>
        <h5>Create new flashcards with the <Link to="/editor">Card Editor</Link>.</h5>
        <br/>
        <h5>Card Decks:</h5>
        {visible}
      </div>
    )
  }
}

  const mapStateToProps = (state, props) => {
    return {
      email: state.firebase.auth.email,
      isLoggedIn: state.firebase.auth.uid
    };
}


export default compose(firebaseConnect(['/homepage']), (connect(mapStateToProps)))(Homepage);
