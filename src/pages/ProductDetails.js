import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../util/Firebase";
import Navigation from "../components/Navigation";
import classes from "./ProductDetails.module.css";
import ArrowRight from "../assets/SVGS/arrowRight.svg";
import ArrowLeft from "../assets/SVGS/arrowLeft.svg";
import { useContext } from "react";
import CartContext from "../context/shopContext";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const cartCtx = useContext(CartContext);

  const addToCartHandler = () => {
    cartCtx.addItem({
      id: product.id,
      name: product.name,
      amount: 1,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDocRef = doc(db, "forniture", productId);
        const productDocSnapshot = await getDoc(productDocRef);

        if (productDocSnapshot.exists()) {
          setProduct(productDocSnapshot.data());
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleThumbnailClick = (index) => {
    setActiveImageIndex(index);
  };

  const handleSlideLeft = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === 0 ? product.additionalImgs.length - 1 : prevIndex - 1
    );
  };

  const handleSlideRight = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === product.additionalImgs.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <Navigation />
      {product ? (
        <div className={classes.container} key={product.id}>
          <div className={classes.xzoomContainer}>
            <div className={classes.mainImahgeAndNavigationButtonsWrapper}>
              <img
                src={ArrowLeft}
                alt="arroww left"
                onClick={handleSlideRight}
                className={classes.arrowLeft}
              />
              <img
                src={ArrowRight}
                onClick={handleSlideLeft}
                className={classes.arrowRight}
                alt="arrow right"
              />
              <img
                id="featured"
                className={classes.featuredImage}
                src={product.additionalImgs[activeImageIndex]}
                alt="Featured"
              />
            </div>
            <div className={classes.xzoomThumbs}>
              {product.additionalImgs.map((imgUrl, index) => (
                <img
                  key={index}
                  className={`thumbnail ${
                    index === activeImageIndex ? "active" : ""
                  }`}
                  src={imgUrl}
                  alt={`Thumbnail ${index}`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </div>

          <div className={classes.description}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <span>${product.price}</span>
            <div>
              <button className={classes.cart} onClick={addToCartHandler}>
                Add To Cart
              </button>
              <button className={classes.buy}>Buy Now</button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading product...</p>
      )}
    </div>
  );
};

export default ProductDetails;
