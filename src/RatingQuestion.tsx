import React, {Component} from 'react';
import RatingQuestionOption from './RatingQuestionOption';
import EditQuestion from './EditQuestion';

import axios from 'axios';

interface RatingQuestionProps{
  id: number,
  title: string,
  deleteQuestion(id: number): void
}

interface RatingQuestionState{
  selectedOption: null | string,
  title: string,
  edit: boolean
}

class RatingQuestion extends Component<RatingQuestionProps, RatingQuestionState>{
  state = {
    selectedOption: null,
    edit: false,
    title: this.props.title
  }

  optionSelected = (option: string) => {
    this.setState({ selectedOption: option});
  }

  confirmEdit = () => {
    this.setState({edit: true});
  }

  confirmDelete = () => {
    if (window.confirm("Delete question?")){
      this.props.deleteQuestion(this.props.id);
    }
  }

  updateTitle = (title: string) => {
    axios.patch(`http://localhost:4567/ratingQuestions/${this.props.id}`, {title})
      .then(response => {
        this.setState({edit:false, title})
      })
  }

  renderQuestionOrEdit = () =>{
    if(this.state.edit){
      return(
        <div>
          <EditQuestion value={this.state.title} updateTitle={this.updateTitle} />
        </div>
      )
    }
    else {
      const {title, selectedOption} = this.state;
      return(
        <div>
          <h3>
            {title}
            <button onClick={this.confirmEdit}>Edit Question</button>
            <button onClick={this.confirmDelete}>Delete Question</button>
          </h3>
          <p> State: {selectedOption}</p>

          <form>
            {this.renderRatingValues()}
          </form>
        </div>
      )
    }
  }

  render(){
    return(
      <div>
        {this.renderQuestionOrEdit()}
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
