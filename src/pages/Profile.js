import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import account from "../assets/Img/accIcon.png";
import classes from "./Profile.module.css";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../util/Firebase";
import Orders from "../components/Orders";
import { useNavigate } from "react-router-dom";
import UploadedProducts from "../components/UploadedProducts";

const Profile = () => {
  const uid = localStorage.getItem("uid");
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showOrders, setShowOrders] = useState(false);
  const [uploadedOrders, setUploadedOrders] = useState([]);
  const [showUploadedProducts, setShowUploadedProducts] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, "user_profiles", uid);

      try {
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserData(userData);
        } else {
          console.error("User profile not found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [uid]);

  const myOrdersHandler = () => {
    setShowOrders(true);
    setShowUploadedProducts(false);
  };

  const hideButtonHandler = () => {
    setShowOrders(false);
    setShowUploadedProducts(false);
  };

  const logOutHandler = () => {
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("uid");
    navigate("/");
  };

  const myProductsHandler = () => {
    setShowUploadedProducts(true);
    setShowOrders(false);
  };

  return (
    <div>
      <Navigation />
      {showOrders && (
        <div>
          <div>
            <Orders />
          </div>
          <button onClick={hideButtonHandler} className={classes.Btn}>
            Hide
          </button>
        </div>
      )}

      {showUploadedProducts && (
        <div>
          <div>
            <UploadedProducts />
          </div>
          <button onClick={hideButtonHandler} className={classes.Btn}>
            Hide
          </button>
        </div>
      )}

      {userData && (
        <div className={classes.body}>
          <div className={classes.first}>
            <img src={account} alt="acc"></img>
            {userData.name} {userData.surname}
          </div>

          <ul className={classes.list}>
            <li>Email: {userData.email}</li>
            <li>Address: {userData.address}</li>
            <li> {userData.phoneNumber} </li>
            <li onClick={myOrdersHandler}> My orders </li>
            <li onClick={myProductsHandler}>My products</li>
            <li onClick={logOutHandler}>Log out</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
