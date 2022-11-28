import React, { useState, useContext, useEffect } from "react";
import { itemsContext, statListsContext } from "../../App";
import AlertDismissible from "../StationeryList/Error";
import Success from "../StationeryList/success";
import Error from "../StationeryList/Error";
import AddItem from "../StationeryList/AddItem";
import Dropdown from "react-bootstrap/Dropdown";
import {
  usePostListItem,
  useGetItemLists,
  useGetAllItemLists,
} from "../Repository/itemListRepo";

function Items(props) {
  //context

  //states
  const [stationeryList, setStat] = useState();
  const [modal, setModal] = useState();
  const [addItemModal, setAddModal] = useState();
  const [isActive, setActive] = useState();
  const [allListItems, setItemLists] = useState();

  //functions
  const handleCloseModal = () => {
    setModal();
    setAddModal();
  };

  const handleAlertClick = () => {
    setActive();
  };

  const ShowLists = (itemId) => {
    console.log(props.List);
    const itemList = props.List.filter((l) => l.fK_ItemId_Id === itemId);
    const statIds = [];
    let list = props.List;

    itemList.forEach((list) => {
      statIds.push(list.fK_StationeryList_Id);
    });

    statIds.forEach((statid) => {
      list = list.filter((l) => l.id !== statid);
    });

    return list;
  };

  const HandleAddItem = (Listid, itemId, list, item) => {
    const newListItem = {
      fK_ItemId_Id: itemId,
      fK_StationeryList_Id: Listid,
    };

    const err = usePostListItem(newListItem);

    if (err !== 1) {
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
    <div onClick={isActive !== undefined ? handleAlertClick : undefined}>
      {modal}
      {addItemModal}
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
                  <h3 className="card-title">
                    {item.itemName}
                    <Dropdown className="float-end me-2 mt-1  ">
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
                        <hr />
                        {/* <div onClick={() => handleModal(item, stationeryList)}>
                          <i
                            className="ms-2 me-1 bi bi-plus-circle-fill link-dark "
                            role="button"
                          ></i>
                          <button className="link-dark bg-white border border-0">
                            <u>Create list</u>
                          </button>
                        </div> */}
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
