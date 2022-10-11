import Accordion from "react-bootstrap/Accordion";
import RemoveItem from "./removeItem";
import React, { useContext, useState } from "react";
import { itemsContext } from "../../App";

function StationeryList() {
  const [myLists, setLists] = useState();
  const [modal, setModal] = useState();

  const handleDelete = (list, itemId) => {
    const lists = [...myLists];
    const index = lists.indexOf(list);
    const items = lists[index].items.filter((i) => i.itemId !== itemId);
    lists[index].items = items;
    setLists(lists);
    setModal();
  };

  const handleCloseModal = () => {
    setModal();
  };

  const handleModal = (item, list) => {
    setModal(
      <RemoveItem
        show={true}
        item={item}
        list={list}
        onClose={handleCloseModal}
        onDelete={handleDelete}
      />
    );
  };

  return (
    <React.Fragment>
      {modal}
      <Accordion flush>
        {myLists.map((list) => (
          <Accordion.Item eventKey={list.listId} key={list.listId} list={list}>
            <Accordion.Header className="sticky-top">
              {list.Name}
            </Accordion.Header>
            <Accordion.Body>
              <div className="row gy-5 gx-5">
                {list.items.map((item) => (
                  <React.Fragment key={item.itemId}>
                    <div className="col-md-6 col-lg-3 col-12">
                      <div className="card text-center bg-dark text-dark bg-opacity-10">
                        <h5 className="card-title">
                          {item.Name}
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
