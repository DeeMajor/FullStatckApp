import { Accordion, Button } from "react-bootstrap";
import RemoveItem from "./removeItem";
import CreateList from "../StationeryList/createList";
import React, { useContext, useState, useEffect } from "react";
import {
  usePostStationery,
  useDeleteStationery,
} from "../Repository/stationeryRepo";
import { statListsContext } from "../../App";
import { useDeleteListItem } from "../Repository/itemListRepo";

function StationeryList() {
  const stationery = useContext(statListsContext);

  const [myLists, setLists] = useState();
  const [modal, setModal] = useState();

  useEffect(() => {
    setLists(stationery);
  }, [stationery]);

  const HandleDeleteItem = (list, itemId) => {
    console.log(myLists);
    const lists = [...myLists];
    const index = lists.indexOf(list);
    const items = lists[index].items.filter((i) => i.itemId !== itemId);
    lists[index].items = items;
    setLists([]);
    setLists(lists);
    useDeleteListItem(itemId);
    console.log(myLists);
    setModal();
  };

  const handleCloseModal = () => {
    setModal();
  };

  const HandleDeleteStationery = (id) => {
    useDeleteStationery(id);
    const updateList = myLists.filter((l) => l.id !== id);
    setLists(updateList);
  };

  const handleModal = (item, list) => {
    setModal(
      <RemoveItem
        show={true}
        item={item}
        list={list}
        onClose={handleCloseModal}
        onDelete={HandleDeleteItem}
      />
    );
  };

  const HandleCreate = (listName) => {
    const newList = {
      Child: listName,
      Status: "Uncomplete",
    };

    let newId = null;

    if (myLists === undefined) {
      newId = 1;
    } else {
      newId = myLists[myLists.length - 1].id;
    }

    console.log(newId);

    const tempList = {
      id: newId,
      grade: "",
      description: "",
      child: listName,
      totalPrice: "",
      school: "",
      status: "Uncomplete",
    };

    usePostStationery(newList);
    setLists([...stationery, tempList]);
    setModal();
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

  return (
    <React.Fragment>
      <div className="text-center mb-3">
        <h2>STATIONERY LIST</h2>
        <a
          className="mx-auto my-auto"
          role="button"
          onClick={() => handleCreateModal()}
        >
          Create New
        </a>
      </div>

      {modal}
      <Accordion flush>
        {myLists !== undefined &&
          myLists.map((list) => (
            <Accordion.Item eventKey={list.id} key={list.id} list={list}>
              <Accordion.Header className="sticky-top ">
                <a
                  className="ms-1 me-5 bi bi-x-circle-fill text-center text-decoration-none link-danger"
                  role="button"
                  onClick={() => HandleDeleteStationery(list.id)}
                ></a>
                {list.child}
              </Accordion.Header>
              <Accordion.Body>
                <div className="row gy-5 gx-5">
                  {list.items.map((item) => (
                    <React.Fragment key={item.item_Id}>
                      <div className="col-md-6 col-lg-3 col-12">
                        <div className="card text-center bg-dark text-dark bg-opacity-10">
                          <h5 className="card-title">
                            {item.itemName}
                            <i
                              onClick={() => handleModal(item, list)}
                              className="float-end bi bi-x-circle-fill link-dark"
                              role="button"
                            ></i>
                          </h5>
                          <img
                            src="https://bit.ly/3R0TRlE"
                            className="card-img-top mx-auto d-block"
                            alt="..."
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
      </Accordion>
    </React.Fragment>
  );
}

export default StationeryList;
