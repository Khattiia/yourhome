import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Navigation.module.css";
import SearchBar from "./SearchBar";
import CartBtn from "./CartBtn";
import Auth from "../pages/Auth";
import account from "../assets/SVGS/accountCircle.svg";
import accIcon from "../assets/Img/accIcon.png";

const Navigation = (props) => {
  const [authIsShown, setAuthIsShown] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const isAuthenticated = localStorage.getItem("uid");

  const showAuthHandler = () => {
    setAuthIsShown(true);
  };

  const hideAuthHandler = () => {
    setAuthIsShown(false);
  };

  const handleAuthentication = () => {
    setAuthenticated(true);
    hideAuthHandler();
  };

  return (
    <>
      <header className={classes.header}>
        <div className={classes.left}>
          <div>
            <Link to="/sell" className={classes.sell}>
              SELL
            </Link>
          </div>
          <div>
            <SearchBar onSearch={props.onSearch} />
          </div>
        </div>

        <Link to="/" className={classes.name}>
          YourHome{" "}
        </Link>

        <div className={classes.right}>
          <div>
            <Link to="/about" className={classes.about}>
              about us
            </Link>
          </div>
          <div>
            {isAuthenticated ? (
              <Link to="/profile">
                <img src={accIcon} alt="acc" className={classes.account} />
              </Link>
            ) : (
              <button onClick={showAuthHandler} className={classes.login}>
                Log In
              </button>
            )}
          </div>
          <div>
            <CartBtn />
          </div>
        </div>
      </header>

      {authIsShown && (
        <Auth
          onHideAuth={hideAuthHandler}
          onSubmitChange={handleAuthentication}
        />
      )}
    </>
  );
};

export default Navigation;
