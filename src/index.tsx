import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import RatingQuestion from './RatingQuestion';
import Form from './Form';
import './style.css';

export interface Question{
  id: number,
  title: string
}

interface AppState{
  name: string,
  data: Question[]
}

// Response is a custom datatype, which features an array of questions essentially.
interface Response{
  data: Question[]
}

class App extends Component<{}, AppState> {
    state = {
      name: 'React',
      data: []
    }

  componentDidMount(){
    axios.get('http://localhost:4567/ratingQuestions')
      .then((response: Response) => {
        this.setState({data: response.data})
      })
  }

  addQuestion = (title: string): void => {
    axios.post("http://localhost:4567/ratingQuestions", { title })
      .then((res) => {
        let newQuestions = (this.state.data as Question[]).concat(res.data)
        this.setState({data: newQuestions})
      })
  }

  deleteQuestion = (id: number): void => {
    // DELETE request to api, delete object
    axios.delete(`http://localhost:4567/ratingQuestions/${id}`)
     .then(() => {
        let newArray = this.state.data.filter((obj: Question) => { return obj.id !== id});
        this.setState({data: newArray});
     })
     .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <h1>Nicks fun surveys</h1>
        <h2>Add Questions:</h2>
        <Form addQuestion={this.addQuestion} />
        <h2>Current Questions:</h2>
        {this.renderRatingQuestions()}
      </div>
    );
  }

  renderRatingQuestions(){
    return this.state.data.map((question: Question) => {
      return <RatingQuestion key={question.id} deleteQuestion={this.deleteQuestion} {...question} />
    })
  }

}

render(<App />, document.getElementById('root'));
