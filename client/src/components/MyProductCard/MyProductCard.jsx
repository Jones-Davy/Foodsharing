import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import EditFoodForm from "../EditFoodForm.js/EditFoodForm";
import EditUserFormModal from '../EditFoodFormModal/EditFoodFormModal'

const BUTTON_WRAPPER_STYLES = {
  position: 'relative',
  zIndex: 1
}

function MyProductCard({ item, setProfile }) {

  const [isOpen, setIsOpen] = useState(false)
  const clickHandler = (id) => {
    setIsOpen(true)
  }

  const [editProduct, setEditProduct] = useState(false);

  const handlerChangeStatus = async () => {
    const resp = await fetch("http://localhost:3001/products", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id: item._id }),
    });
    if (resp.status === 200) {
      setProfile((prev) => {
        let product = prev.product.map((el) =>
          el._id === item._id ? { ...el, status: false } : el
        );
        return { ...prev, product };
      });
    }
  };

  const backgroundImage = {
    backgroundImage: `url(${item.photo})`,
  };

  return (
    <>

      <div style={BUTTON_WRAPPER_STYLES}>
        <EditUserFormModal open={isOpen} onClose={() => setIsOpen(false)} food={item} setProfile={setProfile} />
      </div>

      {item.status ? (
        <div className="col-md-6 d-flex align-items-stretch" data-aos="fade-up">
          <div className="card" style={backgroundImage}>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="#">{item.name}</Link>
              </h5>
              <p className="card-text">{item.description}</p>
              <div className="read-more">
                <Link to="#" onClick={handlerChangeStatus}>
                  <i className="bi bi-arrow-right"></i>Снять с публикации
                </Link>
              </div>
              <div className="read-more">
                <Link to="#" onClick={clickHandler}>
                  <i className="bi bi-arrow-right"></i>Изменить
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {editProduct ? <EditFoodForm food={item} /> : null}
    </>
  );
}

export default MyProductCard;
