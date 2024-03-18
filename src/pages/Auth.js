import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate, useSearchParams, Form, Link } from "react-router-dom";
import classes from "./Auth.module.css";
import Modal from "../components/Modal";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

const Auth = (props) => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const navigate = useNavigate();

  const islogin = searchParams.get("mode") === "login";

  const auth = getAuth();

  const handleEmail = (email) => {
    setEmail(email.target.value);
    setSubmitted(false);
  };

  const handlePassword = (password) => {
    setPassword(password.target.value);
  };

  const handlePhoneNumber = (phoneNumber) => {
    setPhoneNumber(phoneNumber.target.value);
  };

  const handleName = (name) => {
    setName(name.target.value);
  };

  const handleSurname = (surname) => {
    setSurname(surname.target.value);
  };

  const handleAddress = (address) => {
    setAddress(address.target.value);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  const signInHandler = async (form) => {
    form.preventDefault();
    if (email === "" || password.length < 6) {
      setError(true);
      return;
    }
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (!user) {
      return;
    }

    localStorage.setItem("uid", user.uid);
    props.onHideAuth();
    props.onSubmitChange();
    localStorage.setItem("isAuthenticated", "true");
  };

  const signUpHandler = async (form) => {
    form.preventDefault();
    if (
      email === "" ||
      password.length < 6 ||
      phoneNumber === "" ||
      name === "" ||
      surname === "" ||
      address === ""
    ) {
      setError(true);
      return;
    }
    const newUserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const newUser = newUserCredential.user;
    if (!newUser) {
      return;
    }

    const firestore = getFirestore();
    const userDocRef = doc(firestore, "user_profiles", newUser.uid);

    const userData = {
      email: newUser.email,
      phoneNumber: phoneNumber,
      name: name,
      surname: surname,
      address: address,
    };

    await setDoc(userDocRef, userData);

    localStorage.setItem("uid", newUser.uid);
    console.log(newUser);
    navigate("/");
    props.onHideAuth();
    props.onSubmitChange();
    localStorage.setItem("isAuthenticated", "true");
  };

  return (
    <Modal>
      <div className="form">
        <Form
          method="post"
          onSubmit={isSignUp ? signUpHandler : signInHandler}
          className={classes.form}
        >
          <p className={classes.actions}>{isSignUp ? "Sign up" : "Log in"}</p>
          <div>
            <label>Email</label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleEmail}
              required
              className={classes.block}
            ></input>
          </div>
          <div>
            <label>Password</label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={handlePassword}
              required
              className={classes.block}
            ></input>
          </div>
          {isSignUp && (
            <>
              <div>
                <label>Phone Number</label>
                <input
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  onChange={handlePhoneNumber}
                  required
                  className={classes.block}
                ></input>
              </div>
              <div>
                <label>Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={handleName}
                  required
                  className={classes.block}
                ></input>
              </div>
              <div>
                <label>Surname</label>
                <input
                  id="surname"
                  type="text"
                  name="surname"
                  onChange={handleSurname}
                  required
                  className={classes.block}
                ></input>
              </div>
              <div>
                <label>Address</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  onChange={handleAddress}
                  required
                  className={classes.block}
                ></input>
              </div>
            </>
          )}
          <button type="submit" className={classes.submit}>
            SUBMIT
          </button>

          <div className={classes.actions}>
            <Link
              to={`?mode=${isSignUp ? "login" : "signup"}`}
              onClick={toggleMode}
            >
              {isSignUp ? "Log in" : "Sign up"}
              <button onClick={props.onHideAuth}>Close</button>
            </Link>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default Auth;
