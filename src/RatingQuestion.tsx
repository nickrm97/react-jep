import React, {Component} from 'react';
import RatingQuestionOption from './RatingQuestionOption';

interface RatingQuestionProps {
  id: number,
  title: string,
  deleteQuestion(id: number): void
}

interface RatingQuestionState {
  selectedOption: string | null
}

class RatingQuestion extends Component<RatingQuestionProps, RatingQuestionState> {
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
    return values.map((value, i) => <RatingQuestionOption value={value} key={i} optionSelected={this.optionSelected} />)
  }
}

export default RatingQuestion;