import React, {Component} from 'react';
import { Question } from './QuestionTypes';
interface FormProps {
    // This defines a new type called formprops :)
    addQuestion(question: Question): void
}

interface FormState {
    value: string
}

interface RatingQuestionResponse{
    data: Question
}


class Form extends Component<FormProps, FormState>{
    constructor(props: FormProps){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { value: "" };
    }


    handleChange(bob: React.FormEvent){
        this.setState({value: (bob.target as HTMLInputElement).value}); // ? html elements do have a value, we represent it as an html input element ?
    }
    
    handleSubmit = (event: React.FormEvent) =>{
        if (window.confirm("Are you sure you want to add " + this.state.value)){
            // Stops submission event happening
            event.preventDefault();
            
            // Now lets post something 
            const axios = require('axios');
            axios.post("http://localhost:3001/ratingQuestions", {title: this.state.value})
                .then( (response: RatingQuestionResponse) => this.props.addQuestion(response.data))
            this.setState({value: ""})
        }
    }    

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    <button type="submit" value="submit" >Submit</button>
                </form>
            </div>
        );
    }
}

export default Form