import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return token ? (
    <div className="publish-container">
      <form className="publish-form" onSubmit={handleSubmit}>
        <h1>Vends ton article</h1>
        <div className="publish-style">
          <label htmlFor="filePict">Choisissez votre image</label>
          <input //cacher avec un display none
            id="filePict"
            type="file"
            onChange={(event) => {
              setPicture(event.target.files[0]);
            }}
          />
          {picture && <img src={URL.createObjectURL(picture)} />}
        </div>
        <div className="publish-style">
          <input
            type="text"
            placeholder="titre"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <textarea
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea>
        </div>
        <div className="publish-style">
          <input
            type="text"
            placeholder="marque"
            onChange={(event) => {
              setBrand(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Taille"
            onChange={(event) => {
              setSize(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="couleur"
            onChange={(event) => {
              setColor(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Etat"
            onChange={(event) => {
              setCondition(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Lieu"
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </div>
        <div className="publish-style">
          <input
            type="number"
            placeholder="prix"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </div>
        <div className="pub-contain">
          <input type="submit" value="Ajouter" className="add-button" />
        </div>
      </form>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
