import React, { Component } from 'react';

class Submitbox extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  handleKeydown = (e) => {
    //enter is pressed

    if(e.which === 13){
      fetch('http://localhost:3001/api/v0.1/docs', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: 'placeholder_author',
          body: this.textInput.value,
        })
      })
        .then((responseJson) => {
          console.log(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });

      this.textInput.value = "";

    }
  }

  render() {
    return (
      <div className="Submitbox">
        <input
          type="text"
          onKeyDown={this.handleKeydown}
          ref={(input) => { this.textInput = input; }}
        />

      </div>
    );
  }
}

export default Submitbox;
