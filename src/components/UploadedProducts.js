import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../util/Firebase";
import classes from "./Orders.module.css";

const Orders = (props) => {
  const uid = localStorage.getItem("uid");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const ordersRef = collection(db, "uploadedforniture");
        const querySnapshotOrders = await getDocs(
          query(ordersRef, where("uid", "==", uid))
        );

        const ordersData = querySnapshotOrders.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(ordersData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]); // Set an empty array in case of an error
      }
    };

    fetchUserData();
  }, [uid]);

  return (
    <div>
      {products.map((order) => (
        <div key={order.id} className={classes.products}>
          <div className={classes.product}>
            {console.log(order)} {console.log(order.id)}
            <Link to={`/products/${order.id}`}>
              <img src={order.imageUrl} alt={order.name} />
            </Link>
            <div className={classes.description}>
              <p>
                <b>{order.name}</b>
              </p>
              <p>${order.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
