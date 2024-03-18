import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../util/Firebase";
import Navigation from "../Navigation";
import Product from "./Product";
import classes from "./Product.module.css";
import Carousel from "react-material-ui-carousel";
import img1 from "../../assets/Img/vintage1.jpg";
import img2 from "../../assets/Img/vintage2.jpg";
import img3 from "../../assets/Img/vintage3.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import HeaderNavigation from "../HeaderNavigation";

const FurnitureList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRef = collection(db, "forniture");
        const querySnapshot = await getDocs(productsRef);

        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div>
      <Navigation onSearch={handleSearch} />
      <div>
        <HeaderNavigation />
        <Carousel className={classes.slider}>
          <div>
            <img src={img1} alt="pirveli" />
          </div>
          <div>
            <img src={img2} alt="meore" />
          </div>
          <div>
            <img src={img3} alt="mesame" />
          </div>
        </Carousel>
      </div>
      <div className={classes.shop}>
        <div className={classes.shopTitle}></div>
        <div className={classes.products}>
          {filteredProducts.map((product) => (
            <Product key={product.id} data={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FurnitureList;
