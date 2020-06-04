import React from 'react'
//Import css to style this component
import '../styles/Quote.css'

//Our quote component
class Quote extends React.Component {
  constructor() {
    super()
    this.state = {
      //Our quote that will be displayed, right now it has a default value of 'Quote'
      quote: 'Quote',
      //Same for author
      author: 'Author',
      //Red green and blue values that will be randomised from 0 to 255, set it to a default colour of grey
      red: 211,
      green: 211,
      blue: 211
    }
    this.newQuote = this.newQuote.bind(this)
  }

  //function that gets a new quote from an external database and updates the states accordingly
  newQuote() {
    //Use fetch api to get json from a database of quotes
    fetch('https://favqs.com/api/qotd')
    //Parse json to javascript objects
    .then(response => response.json())
    //Set the new quote and author in the state
    //Also set state for red, green and blue to random values to make a random colour
    .then(data => {
      this.setState({
        quote: data.quote.body,
        author: data.quote.author,
        red: Math.floor(Math.random() * 255),
        green: Math.floor(Math.random() * 255),
        blue: Math.floor(Math.random() * 255)
      })
    })
  }

  render() {
    //Get the colour values from state and put them in a rgb function to get a colour
    //This will be the colour of the outer box, quote, author name and new quote button
    let colour = 'rgb(' + this.state.red + ', ' + this.state.green + ', ' + this.state.blue + ')'
    return(
      <div>
        <h1 className='q-title'>Random Quote Machine</h1>
        <p>When you press the "New Quote" button you'll get a new quote each time with the author of the quote on the bottom right corner.
        The colours will change each time you press the button as well.</p>
        <div style={{backgroundColor: colour}} className='quote-component'>
          <div className='q-content'>
            <h1 style={{color: colour}} className='quote'>"{this.state.quote}"</h1>
            <button style={{backgroundColor: colour, color: 'white'}} className='q-button btn' onClick={this.newQuote}>New Quote</button>
            <p style={{color: colour}} className='author'>-{this.state.author}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Quote
