import React, { Component } from 'react';

class Item extends Component {
    render() { 

        return (
            <div className="col-sm-6 col-lg-3 col-6">

                <div className="card text-center bg-dark text-dark bg-opacity-10">
                    <h3 className="card-title">{this.props.item.Name}</h3>
                    <img src="https://bit.ly/3R0TRlE" className="card-img-top mx-auto d-block" alt="..."/>

                    <div className="card-body ">
                    
                    <p className="card-text"></p>
                    <a onClick={() => this.props.onModal(this.props.item)} className="btn btn-primary">Update</a>
                    <a onClick={() => this.props.onDelete(this.props.item.itemId)} className="btn btn-warning">Remove</a>
                    </div>

                </div>

            </div>
            
        );
    }
}
 
export default Item;