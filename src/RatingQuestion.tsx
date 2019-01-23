import React, {Component} from 'react';
import RatingQuestionOption from './RatingQuestionOption';
import EditQuestion from './EditQuestion';

import axios from 'axios';

interface RatingQuestionProps{
  id: number,
  title: string,
  updateQuestion(id: number, title: string):void,
  deleteQuestion(id: number):void
}

interface RatingQuestionState{
  selectedOption: null | string,
  title: string,
  edit: boolean
}

class RatingQuestion extends Component<RatingQuestionProps, RatingQuestionState>{
  state = { selectedOption: null, edit:false, title: '' }

  componentDidMount(){
    this.setState({title: this.props.title})
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
    this.setState({edit:false, title})
    axios.patch(`http://localhost:4567/ratingQuestions/${this.props.id}`, {title}).then(response => console.log(response)).catch(err => console.log(err))
  }

  renderQuestionOrEdit = () =>{
    if(this.state.edit){
      return(
        <div>
          <EditQuestion value={this.state.title} updateTitle={this.updateTitle} />
        </div>
      )
    }
    else{
      return(
        <div>
          <h3>
            {this.state.title} 
            <button onClick={this.confirmEdit}>Edit Question</button>
            <button onClick={this.confirmDelete}>Delete Question</button>
          </h3>
          <p> State: {this.state.selectedOption}</p>
          
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