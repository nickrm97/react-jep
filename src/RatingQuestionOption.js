import React, { Component } from 'react';

class RatingQuestionOption extends Component{
  optionSelected = (event) => {
    this.props.optionSelected(event.target.value);
  }

  render(){
    return(
      <div>
        <input type="radio" name="question" value={this.props.value} onChange={this.optionSelected} /> {this.props.value} <br />
      </div>
    )
  }
}

export default RatingQuestionOption;