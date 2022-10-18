import React, { useState, useContext, useEffect } from "react";
import { itemsContext, statListsContext } from "../../App";
import CreateList from "../StationeryList/createList";
import Dropdown from "react-bootstrap/Dropdown";
import { usePostStationery } from "../Repository/stationeryRepo";

function Items() {
  //context
  const items = useContext(itemsContext);
  const stat = useContext(statListsContext);

  //states
  const [itemsList, setItems] = useState();
  const [stationeryList, setStat] = useState();
  const [modal, setModal] = useState();

  useEffect(() => {
    setStat(stat);
    setItems(items);
  }, [stat]);

  //functions
  const handleCloseModal = () => {
    setModal();
  };

  const HandleCreate = (listName, item) => {
    console.log(listName, item);
    const newList = {
      Child: listName,
      Status: "Uncomplete",
      Items: item,
    };

    const newId = stat[stat.length - 1].id + 1;
    const tempList = {
      id: newId,
      grade: "",
      description: "",
      items: [],
      child: listName,
      totalPrice: "",
      school: "",
      status: "Uncomplete",
    };

    usePostStationery(newList);
    setStat([...stat, tempList]);
    setModal();
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
      {stationeryList !== undefined && (
        <div className="row gy-5 gx-5">
          {itemsList.map((item) => (
            <React.Fragment key={item.item_Id}>
              <div className="col-md-6 col-lg-3 col-12">
                <div className="card text-center bg-dark text-dark bg-opacity-10">
                  <h3 className="card-title">
                    {item.itemName}
                    <Dropdown className="float-end me-2 mt-1">
                      <Dropdown.Toggle as={"a"} id="dropdown-basic">
                        <i
                          className="bi bi-plus text-success"
                          role="button"
                        ></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <h6 className="dropdown-header">Save to...</h6>
                        {stationeryList.map((list) => (
                          <Dropdown.Item key={list.id}>
                            {list.child}
                          </Dropdown.Item>
                        ))}
                        <hr />
                        <div onClick={() => handleModal(item, stationeryList)}>
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
      )}
    </div>
  );
}

export default Items;
