import React, { Component } from 'react';

interface RatingQuestionOptionProps{
  optionSelected(value: string): void,
  value: string
}


class RatingQuestionOption extends Component<RatingQuestionOptionProps>{
  optionSelected = (event: React.FormEvent) => {
    // HELP: What's happening here with the type assignment and the value?
    this.props.optionSelected((event.target as HTMLInputElement).value);
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