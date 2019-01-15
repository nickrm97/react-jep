import React, {Component} from 'react';

class Form extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { value: "" };
    }


    handleChange(event){
        this.setState({value: event.target.value});
    }
    
    handleSubmit = (event) =>{
        if (window.confirm("Are you sure you want to add " + this.state.value)){
            // Stops submission event happening
            event.preventDefault();
            
            // Now lets post something 
            const axios = require('axios');
            axios.post("http://localhost:3001/ratingQuestions", {title: this.state.value})
                .then( response => this.props.addQuestion(response.data))
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