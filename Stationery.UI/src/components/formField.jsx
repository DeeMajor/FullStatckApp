import React, { Component } from 'react';

class FormFields extends Component {
    
    render() { 
        return (
            <React.Fragment>
                 <input type="text" id="Name" className="form-control" aria-describedby="passwordHelpInline"
                 placeholder={this.props.inputField.inputField}/>                                   
            </React.Fragment>
        );
    }
    
}
 
export default FormFields;