import { Accordion, Button } from "react-bootstrap";
import RemoveItem from "./removeItem";
import RemoveStationery from "./RemovetStationery";
import Success from "./success";
import Error from "./Error";
import CreateList from "../StationeryList/createList";
import React, { useContext, useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Update from "./Update";

function StationeryList(props) {
  const [modal, setModal] = useState();

  const HandleDeleteItem = async (list, itemId) => {
    setModal();
    const resp = await props.DeleteStatItem(list, itemId);
    if (resp !== 1) {
      await props.fetch();
      const message = "Item has been removed successfully";
      setModal(
        <Success show={true} message={message} onClose={handleCloseModal} />
      );
    } else {
      setModal(<Error show={true} onClose={handleCloseModal} />);
    }
  };

  const handleCloseModal = () => {
    setModal();
  };

  const HandleDeleteStationery = async (id) => {
    setModal();
    const resp = await props.Delete(id);
    if (resp !== 1) {
      await props.fetch();
      const message = "List has been removed";
      setModal(
        <Success show={true} message={message} onClose={handleCloseModal} />
      );
    } else {
      setModal(<Error show={true} onClose={handleCloseModal} />);
    }
  };

  const HandleCreate = async (list) => {
    const resp = await props.PostList(list);
    setModal();
    if (resp !== 1) {
      await props.fetch();
      const message = "List successfully created";
      setModal(
        <Success
          show={true}
          onClose={handleCloseModal}
          message={message}
          listName={list.Child}
        />
      );
    } else {
      const message =
        "List could not be created. Please try again or contact admin if issue persists.";
      setModal(
        <Error show={true} message={message} onClose={handleCloseModal} />
      );
    }
  };

  const HandleUpdate = async (list) => {
    const resp = await props.Update(list);
    setModal();
    if (resp !== 1) {
      const message = "List successfully Updated";
      setModal(
        <Success
          show={true}
          onClose={handleCloseModal}
          message={message}
          listName={list.Child}
        />
      );
    } else {
      const message =
        "List could not be Updated. Please try again or contact admin if issue persists.";
      setModal(
        <Error show={true} message={message} onClose={handleCloseModal} />
      );
    }
  };

  const GetListItem = async (list, item) => {
    let resp = await props.GetListItem();
    const itemList = resp.find(
      (itemList) =>
        itemList.fK_ItemId_Id === item.item_Id &&
        itemList.fK_StationeryList_Id === list.id
    );
    itemList.bought = true;
    resp = await props.MakeBought(itemList);

    if (resp !== 1) {
      await props.fetch();
      const message = "item updated";
      setModal(
        <Success show={true} onClose={handleCloseModal} message={message} />
      );
    } else {
      const message =
        "Item could not be Updated. Please try again or contact admin if issue persists.";
      setModal(
        <Error show={true} message={message} onClose={handleCloseModal} />
      );
    }
  };

  const handleRemoveItemModal = async (list, item) => {
    setModal(
      <RemoveItem
        show={true}
        onClose={handleCloseModal}
        onDelete={HandleDeleteItem}
        list={list}
        item={item}
      />
    );
  };
  const handleUpdateModal = (list) => {
    setModal(
      <Update
        show={true}
        list={list}
        onUpdate={HandleUpdate}
        onClose={handleCloseModal}
      />
    );
  };

  const handleCreateModal = () => {
    setModal(
      <CreateList
        show={true}
        onClose={handleCloseModal}
        onCreate={HandleCreate}
      />
    );
  };

  const handleDeleteStationarModal = (list) => {
    setModal(
      <RemoveStationery
        show={true}
        onClose={handleCloseModal}
        onDelete={HandleDeleteStationery}
        list={list}
      />
    );
  };

  function checkIfBought(bought) {
    console.log(bought);
    if (bought) {
      return Bought;
    } else {
      return unBought;
    }
  }

  const unBought = <i className="bi bi-dash-circle fs-1"></i>;
  const Bought = (
    <div className="text-success">
      <i className="bi bi-check-circle-fill fs-1"></i>
    </div>
  );

  return (
    <React.Fragment>
      <div className="">
        <div className="text-center mb-3">
          <h2>STATIONERY LIST</h2>
          <a
            className="mx-auto my-auto btn btn-secondary"
            role="button"
            onClick={() => handleCreateModal()}
          >
            Create New
          </a>
        </div>

        {modal}
        <Accordion flush>
          {props.List !== undefined &&
            props.List.map((list) => (
              <Accordion.Item eventKey={list.id} key={list.id} list={list}>
                <Accordion.Header className="sticky-top ">
                  <a
                    className="ms-1 me-5 bi bi-x-circle-fill text-center text-decoration-none link-danger"
                    role="button"
                    onClick={() => handleDeleteStationarModal(list)}
                  ></a>
                  <a role="button" className="text-primary ms-1 me-5">
                    <i
                      className="bi bi-pencil-square"
                      onClick={() => handleUpdateModal(list)}
                    ></i>
                  </a>{" "}
                  {list.child}
                  <span className="text-capitalize">'s List</span>
                </Accordion.Header>

                <Accordion.Body>
                  <ListGroup variant="flush">
                    {list.items.map((item) => (
                      <ListGroup.Item
                        key={item.item_Id}
                        className="bg-secondary text-dark bg-opacity-10 mb-2"
                      >
                        <h4 className="text-center">{item.itemName}</h4>
                        <div className="row position-relative">
                          <div className="col-4 text-center">
                            <img
                              src="https://bit.ly/3R0TRlE"
                              className="img-fluid rounded"
                              alt="..."
                            />
                          </div>
                          <div className="col-4 my-auto text-center">
                            {checkIfBought(item.bought)}
                          </div>
                          <div className="col-4 my-auto text-center">
                            <button
                              type="button"
                              className="btn btn-sm btn-success me-2"
                              onClick={() => GetListItem(list, item)}
                            >
                              Bought
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => handleRemoveItemModal(list, item)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            ))}
        </Accordion>
      </div>
    </React.Fragment>
  );
}

export default StationeryList;
