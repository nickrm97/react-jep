import React, { Component } from 'react';
import { render } from 'react-dom';

import RatingQuestion from './RatingQuestion';
import Form from './Form';
import './style.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      data: []
    };
  }

  componentDidMount(){
    const axios = require('axios');
    axios.get('http://localhost:3001/ratingQuestions')
      .then(response => this.setState({ data: response.data })
      )
  } 
  
  addQuestion = (question) => {
    let newQuestions = this.state.data.concat(question)
    this.setState({data: newQuestions})
  }

  deleteQuestion = (id) => {
    // Removing from state
    let newArray = this.state.data.filter(function(obj){ return obj.id !== id});
    this.setState({data: newArray});

    // DELETE request to api, delete object
    const axios = require('axios');
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
