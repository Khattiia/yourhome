import React, { useState } from "react";
import classes from "./HeaderNavigation.module.css";
import { Link } from "phosphor-react";
import { useNavigate } from "react-router-dom";

function Tooltip({ label, content }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };
  const mouseLeaveHandler = () => {
    setShowTooltip(false);
  };

  const focusHandler = () => {
    setShowTooltip(true);
    console.log("focused");
  };

  const tooltipLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div>
      <div onMouseEnter={toggleTooltip} onMouseLeave={mouseLeaveHandler}>
        {label}
      </div>
      {showTooltip && (
        <div
          onMouseEnter={focusHandler}
          onMouseLeave={tooltipLeave}
          className={classes.Popover}
        >
          <ul className={classes.list}>
            {content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function HeaderNavigation(props) {
  const navigate = useNavigate();

  const JustInhandler = () => {
    navigate("/profile");
  };

  const BestDealsHandler = () => {
    navigate("/profile");
  };

  return (
    <div className={classes.Links}>
      <div className={classes.Link}>
        <div onClick={JustInhandler}>Just In</div>
        <div onClick={BestDealsHandler}>Best Deals</div>
        <Tooltip
          label="Furniture"
          content={["see all furniture", "beds", "tables", "bathroom", "desks"]}
        />
        <Tooltip
          label="Art"
          content={[
            "antique paintings",
            "photographs",
            "oil paintings",
            "collages",
            "fashion sketches",
          ]}
        />
        <Tooltip
          label="Tableware"
          content={[
            "trays",
            "bottles",
            "drinking glasses",
            "plates",
            "mugs",
            "sets",
          ]}
        />
        <Tooltip
          label="Seating"
          content={["sofas", "benches", "chairs", "stools"]}
        />
        <Tooltip
          label="Lighting"
          content={[
            "chandeliers",
            "ceiling lights",
            "lampshades",
            "floor lamps",
          ]}
        />
      </div>
    </div>
  );
}

export default HeaderNavigation;
