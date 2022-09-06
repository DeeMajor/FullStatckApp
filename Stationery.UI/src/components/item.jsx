import React, { Component } from 'react';

class Item extends Component {
    state ={
        itemName: this.props.itemName
    }
    render() { 

        console.log("props", this.props);

        return (
            <div class="col-sm-6 col-lg-3 col-6">

                <div className="card text-center">

                    <img src="https://bit.ly/3R0TRlE" className="card-img-top mx-auto d-block" alt="..."/>

                    <div className="card-body ">
                    <h3 className="card-title">{this.state.itemName}</h3>
                    <p className="card-text">{this.state.itemDesrciption}</p>
                    <a href="#" className="btn btn-primary">Add</a>
                    <a onClick={this.props.onDelete} className="btn btn-warning">Remove</a>
                    </div>

                </div>

            </div>
            
        );
    }
}
 
export default Item;