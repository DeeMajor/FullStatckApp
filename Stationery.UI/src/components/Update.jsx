import React, { Component } from 'react';
import FormFields from './formField';
import { Modal, Button } from "react-bootstrap";

class UpdateModal extends Component { 


    getFields = () => {
        const itemkeys = Object.values(this.props.item);

        const inputFields = [];

        for (let i = 1; i < itemkeys.length; i++){
            const  field ={
                id: i,
                inputField: itemkeys[i]
            }

            inputFields[i] = field
        }

        return(
            <div>

                {inputFields.map(inputField => 
                <FormFields key={inputField.id} 
                inputField = {inputField}
                item = {this.props.item}>
                </FormFields>)}
            </div>
           
        );
    }

    

    render() {      
        
        const inputFields = this.getFields();
                
        return (
            <Modal show={this.props.show} onHide={this.handleClose}>

                <Modal.Header closeButton onClick={() => this.props.onClose()}>
                    <Modal.Title>
                        Modal heading
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form>
                         {inputFields}   
                    </form>                    
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.props.onClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => this.props.onUpdate(this.props.item)}>
                        Save Changes
                    </Button>
                </Modal.Footer>

            </Modal>
        );
    }
}
 
export default UpdateModal;