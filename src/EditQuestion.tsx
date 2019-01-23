import React, {Component} from 'react';
import { stat } from 'fs';

interface EditQuestionProps{
    value: string,
    updateTitle(title:string):void
}

interface EditQuestionState{
    value: string
}

class EditQuestion extends Component<EditQuestionProps, EditQuestionState>{
    state = {value: ""}

    componentDidMount(){
        this.setState({value: this.props.value})
    }

    updateTitle  = (title:string) => {
        this.props.updateTitle(title)
    }

    onChange = (e: React.FormEvent) => {
        this.setState({value: (e.target as HTMLInputElement).value});
    }

    onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.updateTitle(this.state.value);
    }
    
    render(){
        return(
            <div> 
                <form onSubmit={this.onSubmit}>
                    <input type="text" value={this.state.value} onChange={this.onChange}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        ) 
    }
}

export default EditQuestion