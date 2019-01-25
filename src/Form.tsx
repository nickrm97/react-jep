import React, {Component} from 'react';

interface FormState{
    value: string
}

interface FormProps{
    addQuestion(title: string): void
}

class Form extends Component<FormProps, FormState>{
    state = {
      value: ""
    }


    handleChange = (event: React.FormEvent) => {
      this.setState({value: (event.target as HTMLInputElement).value});
    }

    handleSubmit = (event: React.FormEvent) => {
        if (window.confirm("Are you sure you want to add " + this.state.value)){
            // Stops submission event happening
            event.preventDefault();
            this.props.addQuestion(this.state.value)
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
