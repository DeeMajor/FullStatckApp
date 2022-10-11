import React, { useState, useContext, useEffect } from "react";
import { itemsContext } from "../../App";
import useForceUpdate from "../CustomHooks/ForceUpdate";
import CreateList from "../StationeryList/createList";
import Dropdown from "react-bootstrap/Dropdown";
import {
  useGetStationery,
  usePostStationery,
} from "../Repository/stationeryRepo";

function Items() {
  const items = useContext(itemsContext);
  const staioneryList = useGetStationery();
  const [myStatList, setStatList] = useState();

  const [modal, setModal] = useState();

  const handleCloseModal = () => {
    setModal();
  };

  const HandleCreate = (listName, item) => {
    console.log(listName, item);
    const newList = {
      Child: listName,
      Status: "Uncomplete",
    };

    usePostStationery(newList);
    setModal();
  };

  const HandleData = () => {
    setStatList([...staioneryList]);
    console.log(myStatList);
  };

  const handleModal = (item, list) => {
    setModal(
      <CreateList
        show={true}
        item={item}
        onClose={handleCloseModal}
        onCreate={HandleCreate}
      />
    );
  };

  return (
    <div>
      {modal}
      <div className="row gy-5 gx-5">
        {items.map((item) => (
          <React.Fragment key={item.itemId}>
            <div className="col-md-6 col-lg-3 col-12">
              <div className="card text-center bg-dark text-dark bg-opacity-10">
                <h3 className="card-title">
                  {item.Name}
                  <Dropdown className="float-end me-2 mt-1">
                    <Dropdown.Toggle as={"a"} id="dropdown-basic">
                      <i
                        className="bi bi-plus text-success"
                        role="button"
                        onClick={() => HandleData()}
                      ></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <h6 className="dropdown-header">Save to...</h6>
                      {staioneryList.map((list) => (
                        <Dropdown.Item key={list.id}>
                          {list.child}
                        </Dropdown.Item>
                      ))}
                      <hr />
                      <div onClick={() => handleModal(item, staioneryList)}>
                        <i
                          className=" ms-2 me-1 bi bi-plus-circle-fill link-dark"
                          role="button"
                        ></i>
                        <button className="link-dark bg-white border border-0">
                          <u>Create list</u>
                        </button>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </h3>

                <img
                  src="https://bit.ly/3R0TRlE"
                  className="card-img-top mx-auto d-block"
                  alt="..."
                />

                <div className="card-body ">
                  <p className="card-text"></p>
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
