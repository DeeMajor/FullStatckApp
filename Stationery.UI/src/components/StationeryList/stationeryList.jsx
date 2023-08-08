import { Accordion, Button } from "react-bootstrap";
import RemoveItem from "./removeItem";
import RemoveStationery from "./RemovetStationery";
import Success from "./success";
import Error from "./Error";
import CreateList from "../StationeryList/createList";
import React, { useContext, useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Update from "./Update";
import LoadingSpinner from "../Assets/LoadSpinner";
import Tick from "../../images/tick.png";
import Incomplete from "../../images/incomplete.png"
import Complete from "../../images/complete.png"


function StationeryList(props) {
  const [modal, setModal] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const HandleDeleteItem = async (list, itemId) => {
    setModal();
    setIsLoading(true);
    const resp = await props.DeleteStatItem(list, itemId);
    if (resp !== 1) {
      await props.fetch();
      setIsLoading(false);
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
    // setIsLoading(true);
    const resp = await props.Delete(id);
    if (resp !== 1) {
      await props.fetch();
      setIsLoading(false);
      const message = "List has been removed";
      setModal(
        <Success show={true} message={message} onClose={handleCloseModal} />
      );
    } else {
      setModal(<Error show={true} onClose={handleCloseModal} />);
    }
  };

  const HandleCreate = async (list) => {
    setIsLoading(true);
    const resp = await props.PostList(list);
    setModal();
    if (resp !== 1) {
      await props.fetch();
      setIsLoading(false);
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
      setIsLoading(false);
      const message =
        "List could not be created. Please try again or contact admin if issue persists.";
      setModal(
        <Error show={true} message={message} onClose={handleCloseModal} />
      );
    }
  };

  const HandleUpdate = async (list) => {
    setIsLoading(true);
    const resp = await props.Update(list);
    setModal();
    if (resp !== 1) {
      await props.fetch();
      setIsLoading(false);
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
    setIsLoading(true);
    let resp = await props.GetListItem();
    const itemList = resp.find(
      (itemList) =>
        itemList.fK_ItemId_Id === item.item_Id &&
        itemList.fK_StationeryList_Id === list.id
    );
    // itemList.bought = true;
    resp = await props.MakeBought(itemList);

    if (resp !== 1) {
      await props.fetch();
      setIsLoading(false);
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

  const NotAcquired = async (list, item) => {
    setIsLoading(true);
    let resp = await props.GetListItem();
    const itemList = resp.find(
      (itemList) =>
        itemList.fK_ItemId_Id === item.item_Id &&
        itemList.fK_StationeryList_Id === list.id
    );
    itemList.bought = false;
    resp = await props.MakeBought(itemList);

    if (resp !== 1) {
      await props.fetch();
      setIsLoading(false);
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

  function Progress() {}

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
    if (bought) {
      return Bought;
    } else {
      return unBought;
    }
  }

  function checkIfBoughtTick(bought) {
    if (bought) {
      return (
        <div className="card-img-overlay card-inverse bg-secondary text-dark bg-opacity-75">
          <div className="card-block pt-5">
            <img src={Tick} alt="tick" width="150" />
          </div>
        </div>
      );
    }
  }

    function Progress(list) {

    let progress= "";
    let progressLength = list.items.filter(item => item.bought === true).length;
    console.log(list)
      if (progressLength === list.items.length && list.items.length >0) {
        
        progress = <img src={Complete} alt="complete" width="30" height="30" />;
      }else{
        progress = <img src={Incomplete} alt="incomplete" width="30" />;
      }
    
      return progress;
  }

  function checkIfBoughtButton(bought, list, item) {
    console.log(item)
    if (!bought) {
      return (
        <button
          type="button"
          className="btn btn-success"
          onClick={() => GetListItem(list, item)}
        >
          Bought
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="btn btn-warning btn-sm"
          onClick={() => NotAcquired(list, item)}
        >
          Void
        </button>
      );
    }
  }

  const unBought = (
    <div className="mb-5">
      <i className="bi bi-dash-circle fs-1"></i>
    </div>
  );
  const Bought = (
    <div className="text-success mb-5">
      <i className="bi bi-check-circle-fill fs-1"></i>
    </div>
  );

  const noItems = (
    <div className="text-center">
      There are no items in this list.
      <button
        type="button"
        className="btn btn-link"
        onClick={() => props.onPage("items")}
      >
        Add items.
      </button>
    </div>
  );
  
  const itemPrice = () =>{
    
  }
  const noLists = <div className="text-center mb-2">You have no Lists.</div>;

  const checkforItems = (listItems) => {
    if (listItems.length === 0) {
      return noItems;
    }
  };

  const calcTotalEstimate = (list) => {
    let total = 0;
    list.items.forEach((item) => {
      total += item.itemPrice * item.quantity;
    });

    return total;
  };

  const checkComplete = () => {};

  return (
    <React.Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="">
          <div className="text-center mb-3">
            <h2>STATIONERY LIST</h2>
            {props.List == 0 && noLists}
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
                  <div className="sticky-top accordion-button-extra d-flex justify-content-between">
                    <a
                      className=" bi bi-x-circle-fill fs-4 text-decoration-none link-danger ms-3 mt-2"
                      role="button"
                      onClick={() => handleDeleteStationarModal(list)}
                    ></a>
                    <a role="button" className="text-primary mt-2">
                      <i
                        className="bi bi-pencil-square fs-4"
                        onClick={() => handleUpdateModal(list)}
                      ></i>
                    </a>{" "}
                    <p className="mt-3">{list.child}</p>
                    <span className=" mt-3">
                      {" "}
                      {""}Total Estimate: <b>R{calcTotalEstimate(list)}</b>
                    </span>
                    <span className=" mt-3">{Progress(list)}</span>
                    
                    <Accordion.Header className="float-end">
                      {/* <span>{Uncomplete} </span> */}
                    </Accordion.Header>
                  </div>

                  <Accordion.Body className="bg-secondary text-dark bg-opacity-10">
                    <ListGroup variant="flush">
                      {checkforItems(list.items)}
                      {list.items.map((item) => (
                        <ListGroup.Item
                          key={item.item_Id}
                          className=" text-dark bg-opacity-10 mb-2"
                        >
                          <h4 className="text-center">
                            {item.itemName}
                           
                          </h4>
                          <div className="row position-relative">
                            <div className="col-7 text-center card">
                              <img
                                src={item.pictureUrl}
                                className="img-fluid rounded card-img-top"
                                alt="..."
                              />
                              {/* {checkIfBoughtTick(item.bought)} */}
                            </div>
                            <div className="col-5 my-auto fs-6 ">
                            <span className="text-primary fs-3 d-flex justify-content-center">R{item.itemPrice.toFixed(2)}<span className="fs-6 text-dark">(X{item.quantity}){" "}</span></span>
                            <p className="d-flex justify-content-center">{item.itemDescription}</p>
                            <div className="d-flex justify-content-center">
                              {/* {checkIfBoughtButton(item.bought, list, item)} */}
                            <button
                                type="button"
                                className="btn btn-sm btn-danger ms-2"
                                onClick={() =>
                                  handleRemoveItemModal(list, item)
                                }
                              >
                                Remove
                              </button></div>
                            
                            </div>
                            
                            {/* <div className="col-6 d-flex my-auto text-center">
                            
                            <p >{item.itemDescription}</p>
                              <div className=" mx-auto">
                                {checkIfBoughtButton(item.bought, list, item)}
                              
                              <button
                                type="button"
                                className="btn btn-sm btn-danger ms-2"
                                onClick={() =>
                                  handleRemoveItemModal(list, item)
                                }
                              >
                                Remove
                              </button>
                              </div>
                            </div> */}
                          </div>
                          <div className="row my-auto text-center me-2"></div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
          </Accordion>
        </div>
      )}
    </React.Fragment>
  );
}

export default StationeryList;
