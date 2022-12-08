import React, { useState, useContext, useEffect } from "react";
import Success from "../StationeryList/success";
import AvailableLists from "./availabListsModal";
import Error from "../StationeryList/Error";
import LoadingSpinner from "../Assets/LoadSpinner";
import AddItem from "../StationeryList/AddItem";
import Dropdown from "react-bootstrap/Dropdown";

function Items(props) {
  //context

  //states
  const [modal, setModal] = useState();
  const [addItemModal, setAddModal] = useState();
  const [isActive, setActive] = useState();
  const [isLoading, setIsLoading] = useState(false);

  //functions
  const handleCloseModal = async () => {
    setModal();

    setAddModal();
  };

  /*  const handleAlertClick = () => {
    setActive();
  }; */
  const showListModal = (lists, item) => {
    setModal(
      <AvailableLists
        show={true}
        lists={lists}
        item={item}
        onClose={handleCloseModal}
        onAddItem={HandleAddItem}
      />
    );
  };

  const ShowLists = (itemId) => {
    /* const itemList = props.List.filter((l) => l.items.item_Id === itemId); */
    let rangeList = [];
    props.List.forEach((list) => {
      if (list.items.filter((item) => item.item_Id === itemId).length !== 0) {
      } else {
        rangeList.push(list);
      }
    });

    return rangeList;
  };

  const HandleAddItem = async (Listid, itemId, list, item, quantity) => {
    setModal();
    setIsLoading(true);
    const newListItem = {
      fK_ItemId_Id: itemId,
      fK_StationeryList_Id: Listid,
      quantity: quantity,
      bought: false,
    };

    const err = await props.AddItemToList(newListItem);

    if (err !== 1) {
      await props.FetchItems();
      setIsLoading(false);
      const message = "Added to list successfully";
      setAddModal(
        <Success
          show={true}
          message={message}
          item={item}
          list={list}
          onClose={handleCloseModal}
        />
      );
    } else {
      const message =
        "Item could not be added to list. Please try again or contact admin if issue persists.";
      setAddModal(
        <Error show={true} message={message} onClose={handleCloseModal} />
      );
    }
  };

  /* const handleModal = (item, list) => {
    setModal();
  };
 */
  return (
    <div /* onClick={isActive !== undefined ? handleAlertClick : undefined} */>
      {modal}
      {addItemModal}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          {props.items !== undefined && (
            <div className="row gy-5 gx-5">
              {props.items.map((item) => (
                <React.Fragment key={item.item_Id}>
                  <div className="col-md-6 col-lg-3 col-12">
                    <div
                      className={`card text-center bg-dark text-dark bg-opacity-10 ${
                        isActive === item.item_Id
                          ? "shadow-lg p-3 mb-5 bg-body rounded"
                          : ""
                      }`}
                    >
                      <h6 className="card-title">
                        {item.itemName}
                        <i
                          className="bi bi-plus-circle-fill text-success float-end me-2 mt-1"
                          role="button"
                          onClick={() =>
                            showListModal(ShowLists(item.item_Id), item)
                          }
                        ></i>
                        {/* <Dropdown className="float-end me-2 mt-1  ">
                      <Dropdown.Toggle as={"a"} id="dropdown-basic">
                        <i
                          className="bi bi-plus-circle-fill text-success"
                          role="button"
                          onClick={() => setActive(item.item_Id)}
                        ></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <h6 className="dropdown-header">
                          {" "}
                          Save {item.itemName} to...
                        </h6>
                        <hr />
                        {ShowLists(item.item_Id).map((list) => (
                          <Dropdown.Item key={list.id}>
                            <h6
                              onClick={() =>
                                HandleAddItem(list.id, item.item_Id, list, item)
                              }
                            >
                              {list.child}
                            </h6>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown> */}
                      </h6>

                      <img
                        src="https://bit.ly/3R0TRlE"
                        className="card-img-top mx-auto d-block"
                        alt="..."
                      />

                      <div className="card-body ">
                        <p className="card-text">
                          estimate <b>R{item.itemPrice}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default Items;
