import Navigation from "../components/Navigation";
import classes from "./About.module.css";
import mainpic from "../assets/Img/mainpic.jpg";
import headerpic from "../assets/Img/headerPic.webp";

const About = () => {
  return (
    <div className={classes.body}>
      <div>
        <Navigation></Navigation>
      </div>
      <header className={classes.header}>What is YourHome?</header>
      <div className={classes.grid}>
        <div className={classes.gridItem}>
          <img src={mainpic} alt="view" className={classes.headerpic} />
        </div>
        <div className={classes.gridItem}>
          <div className={classes.semiHeader}>
            HUNT FOR VINTAGE OR SELL IT ON. FROM YOUR SOFA.
            <p>
              « YourHome » (formerly known as Brocante Lab) was started in 2014
              to provide a way for everyone to buy and sell the most beautiful
              and unique pieces of second hand furniture and decor. Everyday,
              professional dealers and non-professional sellers add their
              vintage furniture, Scandinavian style pieces and second hand decor
              to YourHome. The prices are decided by the seller and YourHome
              works as an intermediary and trusted third-party between them and
              their clients. As for the clients, they have 300,000 pieces to
              choose from on YourHome, among which they can find their perfect
              match and get it delivered to their door without moving from their
              sofa. The pieces for sale on the site are hand selected each day
              by our team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
