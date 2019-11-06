import React from 'react';
import twitterIcon from './twitter_icon.png';
import './App.css';
import $ from 'jquery.animate';
import QUOTES from './quotes.js';
import COLORS from './colors.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';


class App extends React.Component{
  constructor( props ){
    super( props );
    this.state = {
      quote : "quote",
      author : "author",
      previousQuote: "",
      previousAuthor: "",
      nextQuote : "",
      nextAuthor : "",
      color : "#008080"
      
    };
    this.handleNewQuote = this.handleNewQuote.bind( this );
    this.handlePreviousQuote = this.handlePreviousQuote.bind( this )
  };
  
  selectColor = () => {
       const colorsLength = COLORS.length;
       let randomNumber =  Math.floor( Math.random() * colorsLength );
       let randomColor = COLORS[randomNumber];
       return randomColor;
  }
  // Fade in-out-effect on new quote
  fadeout = (after) => {
       $(".container").animate({opacity: "0"}, "medium", after);
  };
  changeColor = () => {
       let color = this.selectColor();
       $(".container").css({"background-color": color});
       $(".container").css({"color": color});
       $(".new_quote").css({"background-color": color}) 
  }
  fadein = () => {
       $(".container").animate({opacity : "1"}, "slow");
  }
  //get new quote
  handleNewQuote = () => {
    let quoteLength = QUOTES.length;
    let randomNumber = Math.floor( Math.random() * quoteLength );
    let author = QUOTES[randomNumber].author;
    let quote = QUOTES[randomNumber].quote;
    let currentQuote = this.state.quote;
    let currentAuthor = this.state.author;
    let update = () => {
       this.setState( state => {
              return {
                quote : quote,
                author : author,
                previousQuote : currentQuote,
                previousAuthor : currentAuthor,
                nextQuote : "",
                nextAuthor : ""
              }
            });
       this.changeColor();
       this.fadein();
       };
       this.fadeout(update);
  };
  //go back to last quote
  handlePreviousQuote = () => {
    if( this.state.previousQuote !== ""){
      let nextQuote = this.state.quote;
      let nextAuthor = this.state.author;
      let currentQuote = this.state.previousQuote;
      let currentAuthor = this.state.previousAuthor;
      this.setState( state => {
        return {
          quote : currentQuote,
          author : currentAuthor,
          nextQuote : nextQuote,
          nextAuthor : nextAuthor,
          previousQuote : "",
          previousAuthor : ""
        }
      });
    }
  };
  // return to current quote from last qote
  handleNextQuote = () => {
    if( this.state.nextQuote !== ""){
      let currentQuote = this.state.nextQuote;
      let currentAuthor = this.state.nextAuthor;
      let previousQuote = this.state.quote;
      let previousAuthor = this.state.author;
      this.setState( state => {
        return {
          quote : currentQuote,
          author : currentAuthor,
          previousQuote : previousQuote,
          previousAuthor : previousAuthor,
          nextQuote : "",
          nextAuthor : ""
        }
      });
    }
  };
  // tweet quote opens new window and enters quote to tweet
  handleTweet = () => {
    let quote = this.state.quote;
    let author = " - " + this.state.author;
    window.open(`https://twitter.com/intent/tweet?text=${quote}${author}`, 'popUpWindow', 'height=300, width=500resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
  };
  componentDidMount(){
    this.handleNewQuote();
  }
 
  render(){
    return(
        <div>
            <div className="container">
                <div className="box_main">
                    <QuoteBox 
                        quote={this.state.quote}
                        author={this.state.author}
                    />
                    <div className="buttons_row">
                        <Tweet 
                            handleTweet={this.handleTweet}
                        />
                        <PreviousQuote 
                        handlePreviousQuote={this.handlePreviousQuote}
                        />
                        <NextQuote 
                        handleNextQuote={this.handleNextQuote}
                        />
                        <NewQuote 
                            handleNewQuote={this.handleNewQuote}
                        />
                    </div>
                </div>
            </div>
            <div className="footer">
                <Footer />
            </div>
      </div>
    )
  }
};

const QuoteBox = ( props ) => {
  return(
    <div className="quote_box">
        <p className="quote"><FontAwesomeIcon icon={faQuoteLeft}/>{props.quote}<FontAwesomeIcon icon={faQuoteRight}/></p>
        <p className="author"> - {props.author}</p>
    </div>
  )
};

const Tweet = ( props ) => {
  return(
    <div>
    <button className="tweet button" onClick={props.handleTweet}><img className="icons" src={twitterIcon} alt="twitter icon"/></button>
    
    </div>
   )
};

const NewQuote = ( props ) => {
  return (
    <button className="new_quote button" onClick={props.handleNewQuote}>New Quote</button>
  )
};

const NextQuote = ( props ) => {
  return (
    <button className="next_quote arrows button" onClick={props.handleNextQuote}><FontAwesomeIcon icon={faChevronRight}/></button>
  )
};

const PreviousQuote = ( props ) => {
  return (
    <button className="previous_quote arrows button" onClick={props.handlePreviousQuote}><FontAwesomeIcon icon={faChevronLeft}/></button>
  )
};

const Footer = ( props ) => {
  return (
    <div>
      <footer>
        <a target="_blank" rel="noopener noreferrer" href="https://icons8.com/icons/set/twitter">Twitter</a>
        icon by 
        <a target="_blank" rel="noopener noreferrer" href="https://icons8.com">Icons8</a>
      </footer>
    </div>
  )
};

export default App;
