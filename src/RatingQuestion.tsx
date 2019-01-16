import React, {Component} from 'react';
import RatingQuestionOption from './RatingQuestionOption';

interface RatingQuestionProps{
  id: number,
  title: string
  deleteQuestion(id: number):void
}

interface RatingQuestionState{
  selectedOption: null | string
}

class RatingQuestion extends Component<RatingQuestionProps, RatingQuestionState>{
  state = { selectedOption: null }

  optionSelected = (option: string) => {
    this.setState({ selectedOption: option});
  }

  confirmDelete = () => {
    if (window.confirm("Delete question?")){
      this.props.deleteQuestion(this.props.id);
    } 
  }

  render(){
    return(
      <div>
        <h3>{this.props.title} <button onClick={this.confirmDelete}>Delete Question</button></h3>
        <p> State: {this.state.selectedOption}</p>
        
        <form>
          {this.renderRatingValues()}
        </form>
      </div>
    )
  }

  renderRatingValues(){
    let values = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
    // HELP: Why is there no type assignment on something like this?
    return values.map((value, i) => <RatingQuestionOption value={value} key={i} optionSelected={this.optionSelected} />)
  }
}

export default RatingQuestion;