import React, { Component } from 'react';
import { render } from 'react-dom';

import { Question } from './QuestionTypes';
import RatingQuestion from './RatingQuestion';
import Form from './Form';
import './style.css';


interface RatingQuestionsResponse{
  data: Question[]
}


interface AppState {
  name: string,
  data: Question[] 
}

class App extends Component<{}, AppState> {
  state = {
    name: 'React',
    data: []
  };

  componentDidMount(){
    const axios = require('axios');
    axios.get('http://localhost:3001/ratingQuestions')
      .then((response: RatingQuestionsResponse) => this.setState({ data: (response.data as Question[]) })
      )
  } 
  
  addQuestion = (question: Question) => {
    let newQuestions = (this.state.data as Question[]).concat(question)
    this.setState({data: newQuestions})
  }

  deleteQuestion = (id : number) => {
    // Removing from state
    let newArray = this.state.data.filter((obj: Question) => { return obj.id !== id});
    this.setState({data: newArray});

    // DELETE request to api, delete object
    const axios = require('axios');
    axios.delete(`http://localhost:3001/ratingQuestions/${id}`)
     .then((response: {}) => console.log(response))
     .catch((err: {}) => console.log(err))
  }

  render() {
    return (
      <div>
        <h1> Nick's fun surveys</h1>
        <h2>Add Questions:</h2>
        <Form addQuestion={this.addQuestion}/>
        <h2>Current Questions:</h2>
        {this.renderRatingQuestions()}
      </div>
    );
  }

  renderRatingQuestions(){
    return this.state.data.map((x, i) => <RatingQuestion key={i} deleteQuestion={this.deleteQuestion} {...x} />)
  }

}

render(<App />, document.getElementById('root'));
