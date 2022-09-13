import React, { Component } from 'react';
import Item from "./item";
import UpdateModal from './Update';

class Items extends Component {
    state = { 
        items: [
            {itemId: 1, Name: "Item 1", Description: "Describe me 1", Extra: "Extra for test"},
            {itemId: 2, Name: "Item 2", Description: "Describe me 2"},
            {itemId: 3, Name: "Item 3", Description: "Describe"},
            {itemId: 4, Name: "Item 4", Description: "Describe"}
        ],
        modalShow: false,
        itemToEdit:{},
        fields:{}
     }
     
     handleDelete = (itemId) => {
        const items = this.state.items.filter(c => c.itemId !== itemId);
        this.setState({items})
     }

     handleCloseModal = () => {
        let modalShow = false;
       this.setState({modalShow})
     }
     
     handleModal = (item) => {
       let modalShow = true;
       this.setState({modalShow,itemToEdit: item})        
     }

     handleUpdate = (item) => {

        const items = [...this.state.items];
        const index = items.indexOf(item);
        items[index] = {...item};
        this.setState({items})
     }

    render() { 
        return (
            <React.StrictMode>
            <UpdateModal item={this.state.itemToEdit} 
                show = {this.state.modalShow}
                onClose={this.handleCloseModal} 
                onUpdate={this.handleUpdate}>
                
            </UpdateModal>
            <div className="row">
                {this.state.items.map(item => 
                <Item key={item.itemId} 
                    item={item} 
                    onDelete={this.handleDelete}
                    onModal={this.handleModal}>
                </Item>)}
            </div>
            </React.StrictMode>
        );
    }
}
 
export default Items;