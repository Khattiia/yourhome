import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
} from "react-router-dom";
import { useState } from "react";
import { doc, collection, setDoc, updateDoc, addDoc } from "firebase/firestore";
import { db } from "../util/Firebase";
import classes from "./SellForm.module.css";
import { WithContext as ReactTags } from "react-tag-input";
import Auth from "../pages/Auth";

function SellForm({ method, event }) {
  const [authIsShown, setAuthIsShown] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const isAuthenticated = localStorage.getItem("uid");
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const uid = localStorage.getItem("uid");

  const [additionalImages, setAdditionalImages] = useState([]);

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const isSubmitting = navigation.state === "submitting";

  const showAuthHandler = () => {
    setAuthIsShown(true);
  };

  const hideAuthHandler = () => {
    setAuthIsShown(false);
  };

  const handleAuthentication = () => {
    setAuthenticated(true);
    hideAuthHandler();
    navigate("/profile");
  };

  const handleDelete = (i) => {
    setAdditionalImages(additionalImages.filter((img, index) => index !== i));
  };

  const handleAddition = (img) => {
    setAdditionalImages([...additionalImages, img]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = additionalImages.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setAdditionalImages(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  function cancelHandler() {
    navigate("/");
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const newFurnitureData = {
      name: formData.get("name"),
      imageUrl: formData.get("imageUrl"),
      price: parseFloat(formData.get("price")),
      description: formData.get("description"),
      additionalImgs: additionalImages.map((img) => {
        return img.text;
      }),
      uid: uid,
    };

    try {
      const furnitureCollectionRef = collection(db, "forniture");
      const newFurnitureDocRef = await addDoc(
        furnitureCollectionRef,
        newFurnitureData
      );

      // Use the generated document ID for both collections
      const uploadedFornitureCollection = collection(db, "uploadedforniture");
      const newUploadedFornitureDocRef = await addDoc(
        uploadedFornitureCollection,
        newFurnitureData
      );

      // Update the data with the correct IDs
      const newFurnitureDataWithId = {
        ...newFurnitureData,
        id: newFurnitureDocRef.id,
      };

      await setDoc(newFurnitureDocRef, newFurnitureDataWithId);
      await setDoc(newUploadedFornitureDocRef, newFurnitureDataWithId);

      navigate("/");
    } catch (error) {
      console.error("Error adding new furniture item:", error);
    }
  };

  return (
    <div>
      {uid && (
        <Form method={method} className={classes.form} onSubmit={submitHandler}>
          {data && data.errors && (
            <ul>
              {Object.values(data.errors).map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )}
          <p>
            <label htmlFor="name">name</label>
            <input
              id="name"
              type="text"
              name="name"
              required
              defaultValue={event ? event.title : ""}
            />
          </p>
          <p>
            <label htmlFor="imageUrl">imageUrl</label>
            <input
              id="imageUrl"
              type="url"
              name="imageUrl"
              required
              defaultValue={event ? event.image : ""}
            />
          </p>
          <p>
            additional images of the product (required 5 images)
            <ReactTags
              tags={additionalImages}
              delimiters={delimiters}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              handleTagClick={handleTagClick}
              inputFieldPosition="bottom"
              autocomplete
            />
          </p>
          <p>
            <label htmlFor="price">Price</label>
            <input id="price" type="number" name="price" required />
          </p>
          <p>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              required
              defaultValue={event ? event.description : ""}
            />
          </p>
          <div className={classes.actions}>
            <button
              type="button"
              onClick={cancelHandler}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Save"}
            </button>
          </div>
        </Form>
      )}
      {!uid && (
        <div className={classes.error}>
          <div>
            Pease Log in Or Sign Up To upload and sell your vintage forniture{" "}
          </div>
          <button onClick={showAuthHandler}> Click Here </button>
        </div>
      )}

      {authIsShown && (
        <Auth
          onHideAuth={hideAuthHandler}
          onSubmitChange={handleAuthentication}
        />
      )}
    </div>
  );
}

export default SellForm;
