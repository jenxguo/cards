import React from 'react';
import './CardEditor.css';
import {Link, withRouter} from 'react-router-dom';
import {firebaseConnect} from 'react-redux-firebase';
import {compose} from 'redux';

class CardEditor extends React.Component {
  constructor(props) {
    super(props);
    //just storing input in state
    this.state = {
      cards: [
        {front: 'Question', back: 'Answer'},
        {front: 'Word', back: 'Definition'}
      ],
      front: '',
      back: '',
      name: ''
    }
  }

  //pushes new deck to firebase database
  //need callback function so we wrote onComplete, redirect to new deck page
  createDeck = () => {
    const deckId = this.props.firebase.push('/flashcards').key;
    const newDeck = {cards: this.state.cards, name: this.state.name};
    const onComplete = () => {
      console.log('database updated!');
      this.props.history.push(`/viewer/${deckId}`);
    }
    const updates = {}
    updates[`/flashcards/${deckId}`] = newDeck;
    updates[`/homepage/${deckId}`] = {name: this.state.name};
    this.props.firebase.update(`/`, updates, onComplete);
  }

  //general handle change function with name property, need to use square bracket []
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  addCard = () => {
    if (this.state.front.trim() !== '' || this.state.back.trim() !== '') {
      const newCard = {front: this.state.front, back:this.state.back};
      const cards = this.state.cards.slice().concat(newCard);
      //clear state
      this.setState({cards, front:'', back:''})
    }
  }

  deleteCard = index => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({cards});
  }

  render () {
    const cards = this.state.cards.map((card, index) => {
      return(
        <tr key={index}>
          <td>{card.front}</td>
          <td>{card.back}</td>
          <td>
            <button onClick={() => this.deleteCard(index)}>Delete Card</button>
          </td>
        </tr>
      )
    })

    return (
      <div className="cardEditor">
        <h2>Card Editor</h2>
        <div>
          Deck name: <input name="name" onChange={this.handleChange} placeholder="Name of deck" value={this.state.name}/>
        </div>
        <br/>
        <table>
          <thead>
            <tr>
              <th>Front</th>
              <th>Back</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{cards}</tbody>
        </table>
        <br/>
        <input name="front" onChange={this.handleChange} placeholder="Front of Card" value={this.state.front}/>
        <input name="back" onChange={this.handleChange} placeholder="Back of Card" value={this.state.back}/>
        <button onClick={this.addCard}>Add Card</button>
        <hr/>
        <div>
          <button onClick = {this.createDeck} disabled={!this.state.name.trim() || this.state.cards.length === 0}>Create deck</button>
        </div>
        <br/>
      </div>
    );
  }
}
//when set the value of inputs, they are now controlled inputs bc controlled by state
//change state with on change then pass state back into value of input

export default compose(firebaseConnect(), withRouter)(CardEditor);
