import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div className="Message">
        {this.props.author}: {this.props.body}
      </div>
    );
  }
}

export default Message;
