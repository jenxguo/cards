import React from 'react';
import './CardViewer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, withRouter} from 'react-router-dom';
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'redux';

//how to deal with card length here?

class CardViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0, front: true };
  }

  switchSide = () => {
    this.setState({ front: !this.state.front })
  }

  prevCard = () => {
    var index = this.state.index;
    if (index > 0) {
      index = index - 1;
      this.setState({index})
      this.setState({front: true})
    }
  }

  nextCard = () => {
    var index = this.state.index;
    if (index < this.props.cards.length - 1) {
      index = index + 1;
      this.setState({index})
      this.setState({front: true})
    }
  }

  render() {
    if (!isLoaded(this.props.cards)) {
      return <div>Loading...</div>
    }

    if (isEmpty(this.props.cards)) {
      return <div>Page not found</div>
    }

    const cards = this.props.cards;

    const count = cards.length;
    var progress = 0;
    if (this.state.index >= 0) {
      progress = (this.state.index+1)*100/count
    }

    //switch front or back card
    var card = (
      <h3>{cards[this.state.index].front}</h3>
    )
    if (!this.state.front) {
      card = (<h3>{cards[this.state.index].back}</h3>)
    }

    var style = {
      width: progress + "%"
    }

    return (
      <div className='cardViewer'>
        <h2>{this.props.name}</h2>
          <div className='container'>
            <div onClick={this.switchSide} className='card'>
              {card}
            </div>
            <div className='buttons'>
              <button className="arrows" onClick={this.prevCard}><i className="gg-arrow-left-o"></i></button>
              <button className="arrows" onClick={this.nextCard}><i className="gg-arrow-right-o"></i></button>
            </div>
          </div>
            <h4>Card {this.state.index + 1} out of {count}</h4>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style={style} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        <hr/>
        <Link to="/editor">Go to Card Editor</Link>
      </div>
    );
  }
}

//add link to go from page to page, makes it so that it doesnt reload every time, SAVES the cards
//soooo react is a SINGLE PAGE APP!!! bc doesn't ever reload a new page, just CHANGES CONTENT on the PAGE
//so link isnt actually going to new page, its ON A SINGLE PAGE WOAHHHH
//Link changes router state + dynamically rewrites page content based on path
//when set the value of inputs, they are now controlled inputs bc controlled by state
//change state with on change then pass state back into value of input

//need access to props here (deckid from url in app.js)
const mapStateToProps = (state, props) => {
  console.log(state);
  const deck = state.firebase.data[props.match.params.deckId];
  //cant access these if deck is undefined so use &&, so if deck is undefined, wont even try to eval deck.name
  const name = deck && deck.name;
  const cards = deck && deck.cards;
  //keep these prop names similar to whats in state
  return {cards: cards, name: name};
}

export default compose(
  withRouter,
  firebaseConnect(props => {
    console.log('props', props);
    const deckId = props.match.params.deckId;
    return [{path: `/flashcards/${deckId}`, storeAs: deckId}];
  }),
  connect(mapStateToProps))(CardViewer);
