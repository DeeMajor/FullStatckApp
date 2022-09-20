import React, { useContext } from "react";
import { itemsContext } from "../../App";

function Items() {

  const items = useContext(itemsContext);

  return (
    <div>
      <div className="row gy-5 gx-5">
        {items.map((item) => (
          <React.Fragment key={item.itemId}>
            <div className="col-md-6 col-lg-3 col-12">
              <div className="card text-center bg-dark text-dark bg-opacity-10">
                <h3 className="card-title">jj</h3>
                <img
                  src="https://bit.ly/3R0TRlE"
                  className="card-img-top mx-auto d-block"
                  alt="..."
                />

                <div className="card-body ">
                  <p className="card-text"></p>
                  <a className="btn btn-primary">Update</a>
                  <a className="btn btn-warning">Remove</a>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Items;
