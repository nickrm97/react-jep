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
  // How does state know that app state is related to the state object??
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


    nicksfunstate = {
      name: "bob",
      id: 2
    }

  componentDidMount(){
    axios.get('http://localhost:3001/ratingQuestions')
      .then((response: Response) => this.setState({ data: (response.data as Question[])})
      )
  } 
  
  addQuestion = (question: Question):void => {
    let newQuestions = (this.state.data as Question[]).concat(question)
    this.setState({data: newQuestions})
  }

  deleteQuestion = (id: number): void => {
    // Removing from state
    let newArray = this.state.data.filter(function(obj: Question){ return obj.id !== id});
    this.setState({data: newArray});

    // DELETE request to api, delete object
    axios.delete(`http://localhost:3001/ratingQuestions/${id}`)
     .then(response => console.log(response))
     .catch(err => console.log(err))
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
