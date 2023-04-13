
import React from 'react';
class Child extends React.Component{
    
    onTrigger = (event) => {
        this.props.parentCallback("hellooooo");
        event.preventDefault();
    }
  
    render(){
        return(
        <div>
            <form onSubmit = {this.onTrigger}>
                <input type = "submit" value = "Submit"/>
            </form>
        </div>
        )
    }
}
export default Child;