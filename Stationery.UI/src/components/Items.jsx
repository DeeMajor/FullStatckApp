import React, { Component } from 'react';
import Item from "./item";

class Items extends Component {
    state = { 
        items: [
            {itemId: 1, Name: "Item 1" },
            {itemId: 2, Name: "Item 2" },
            {itemId: 3, Name: "Item 3" },
            {itemId: 4, Name: "Item 4" }
        ]
     }
     
     handleDelete = itemId => {
        
     }
     
    render() { 
        return (
            <div class="row">
                {this.state.items.map(item => 
                <Item key={item.itemId} itemName={item.Name} onDelete={this.handleDelete}>                  
                </Item>)}
            </div>
        );
    }
}
 
export default Items;