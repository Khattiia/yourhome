import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Product.module.css";
import CartContext from "../../context/shopContext";

const Product = (props) => {
  const cartCtx = useContext(CartContext);

  const { id, name, price, imageUrl } = props.data;

  const addToCartHandler = () => {
    const cartArray = JSON.parse(localStorage.getItem("cart"));
    if (cartArray) {
      cartArray.push({
        id: id,
        name: name,
        amount: 1,
        price: price,
        imageUrl: imageUrl,
      });
      localStorage.setItem("cart", JSON.stringify(cartArray));
    } else {
      const item = [
        {
          id: id,
          name: name,
          amount: 1,
          price: price,
          imageUrl: imageUrl,
        },
      ];

      const newItem = JSON.stringify(item);
      localStorage.setItem("cart", newItem);
    }
    cartCtx.addItem({
      id: id,
      name: name,
      amount: 1,
      price: price,
      imageUrl: imageUrl,
    });
  };

  return (
    <div className={classes.product}>
      <Link to={`/products/${id}`}>
        <img src={imageUrl} alt={name} />
      </Link>
      <div className={classes.description}>
        <p>
          <b> {name} </b>
        </p>
        <p>${price}</p>
      </div>
      <button onClick={addToCartHandler} className={classes.addToCartBtn}>
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
