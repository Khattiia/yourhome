import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../util/Firebase";
import classes from "./Orders.module.css";

const Orders = (props) => {
  const uid = localStorage.getItem("uid");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const productsRef = collection(db, "orders");
        const querySnapshot = await getDocs(productsRef);

        const ordersData = [];
        querySnapshot.forEach((doc) => {
          const orderData = doc.data();
          const itemsData = orderData.items.reduce((acc, item) => {
            const existingItem = acc.find(
              (existing) => existing.id === item.id
            );
            if (existingItem) {
              existingItem.quantity += 1;
            } else {
              acc.push({
                id: item.id,
                imageUrl: item.imageUrl,
                price: item.price,
                quantity: 1,
              });
            }
            return acc;
          }, []);
          ordersData.push({
            id: doc.id,
            items: itemsData,
          });
        });

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [uid]);

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id} className={classes.products}>
          {order.items.map((item) => (
            <div key={item.id} className={classes.product}>
              {console.log(item.id)}
              <Link to={`/products/${item.id}`}>
                <img src={item.imageUrl} alt={item.name} />
              </Link>
              <div className={classes.description}>
                <p>
                  <b>{item.name}</b>
                </p>
                <p>${item.price}</p>
                {item.quantity > 1 && <p>Quantity: {item.quantity}</p>}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Orders;
