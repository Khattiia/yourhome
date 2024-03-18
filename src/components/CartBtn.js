import React, { useContext, useEffect, useState } from "react";
import { ShoppingCart } from "phosphor-react";
import { Link } from "react-router-dom";
import CartContext from "../context/shopContext";
import classes from "./CartBtn.module.css";

const CartBtn = (props) => {
  const cartCtx = useContext(CartContext);
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);

  useEffect(() => {
    setNumberOfCartItems(
      cartCtx.items.reduce((total, item) => total + item.amount, 0)
    );
  }, [cartCtx.items]);

  return (
    <Link to="/cart" className={classes.button}>
      <span className={classes.icon}>
        <ShoppingCart size={32} />
      </span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </Link>
  );
};

export default CartBtn;
