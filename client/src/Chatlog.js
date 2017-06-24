import React, { Component } from 'react';
import Message from './Message';

class Chatlog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    }
    // this.state = {
    //   messages: ['message 1', 'message 2']
    // }
    // this.state.messageItems = this.state.messages.map((message) =>
    //   <p>{message}</p>
    // );

    // This binding is necessary to make `this` work in the callback
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    fetch('http://localhost:3001/api/v0.1/docs')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({messages: responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    var messageItems = this.state.messages.map((message) => {
      if(!message.doc.body || !message.doc.author || !message.doc.timestamp)
        return;

      return(
        <Message
          key={message.doc.id}
          body={message.doc.body}
          author={message.doc.author}
          timestamp={message.doc.timestamp}
        />
      );
    });
    return (
      <div className="Chatlog">
        {messageItems}
      </div>
    );
  }
}

export default Chatlog;
