import React, { useState, useContext } from "react";
import Navigation from "../components/Navigation";
import classes from "./Cart.module.css";
import { Link, useNavigate } from "react-router-dom";
import { doc, collection, setDoc, getFirestore } from "firebase/firestore";
import CartContext from "../context/shopContext";

const Cart = () => {
  const cartCotx = useContext(CartContext);

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const cartCtx = JSON.parse(localStorage.getItem("cart"));
  const navigate = useNavigate();
  let totalAmaount = 0;
  cartCtx.forEach((item) => {
    totalAmaount += item.price;
  });
  const uid = localStorage.getItem("uid");

  const continueHandler = () => {
    navigate("/");
  };

  let itemsMap = new Map();

  for (const item of cartItems) {
    if (itemsMap.has(item.id)) {
      itemsMap.get(item.id).quantity += item.amount;
    } else {
      itemsMap.set(item.id, { ...item, quantity: item.amount });
    }
  }

  const removeItemFromCartHandler = (itemId) => {
    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) {
      return;
    }

    if (updatedCartItems[itemIndex].amount > 1) {
      updatedCartItems[itemIndex].amount -= 1;
    } else {
      updatedCartItems.splice(itemIndex, 1);
    }

    setCartItems(updatedCartItems);

    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const orderButtonHandler = async () => {
    try {
      const firestore = getFirestore();
      const ordersCollection = collection(firestore, "orders");

      const orderDoc = doc(ordersCollection);

      const orderData = {
        userId: uid,
        totalPrice: totalAmaount,
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl,
        })),
      };

      await setDoc(orderDoc, orderData);

      setCartItems([]);
      navigate("/");
    } catch (error) {
      console.error("Error saving order to Firestore: ", error);
    }
  };

  return (
    <>
      <div>
        <Navigation />
      </div>

      <div className={classes.cart}>
        Cart Items
        <div>
          <div className={classes.products}>
            {Array.from(itemsMap.values()).map((item) => (
              <div className={classes.products} key={item.id}>
                <div className={classes.product}>
                  <Link to={`/products/${item.id}`}>
                    <img src={item.imageUrl} alt={item.name} />
                  </Link>
                  <div className={classes.name}>{item.name}</div>
                  <div>${item.price.toFixed(2)}</div>
                  <div>{item.quantity}X</div>
                  <button
                    onClick={() =>
                      removeItemFromCartHandler(item.id, item.price)
                    }
                    className={classes.buttonOrder}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <span>Total Amount </span>
          <span>{totalAmaount.toFixed(2)}$</span>
        </div>
        <div>
          <button className={classes.buttonContinue} onClick={continueHandler}>
            Continue Shopping
          </button>
          <button onClick={orderButtonHandler} className={classes.buttonOrder}>
            Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
