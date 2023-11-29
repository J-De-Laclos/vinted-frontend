import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/Publish.css";

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
      alert("Votre article a bien été ajouté");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return token ? (
    <div className="publish-container">
      <form className="publish-form" onSubmit={handleSubmit}>
        <h1>Vends ton article</h1>
        <div className="publish-style publish-img">
          <label htmlFor="filePict">
            <span>+</span>Ajoutez une photo
          </label>
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
          <div className="publish-style-in-box">
            <p>Titre</p>
            <input
              type="text"
              placeholder="ex: Polo Ralph Lauren bleu"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="publish-style-in-box">
            <p>Décris ton article</p>
            <textarea
              placeholder="ex: Porté quelques fois; Taille bien etc..."
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <div className="publish-style-brand">
          <div className="publish-style-in-box-brand">
            <p>Marque</p>
            <input
              type="text"
              placeholder="ex: Adidas, Zara, Vet'affair..."
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />
          </div>
          <div className="publish-style-in-box-brand">
            <p>Taille</p>
            <input
              type="text"
              placeholder="ex: M / L / 42 / 44 "
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
          </div>
          <div className="publish-style-in-box-brand">
            <p>Couleur</p>
            <input
              type="text"
              placeholder="ex: Rouge, Bleu, Canari..."
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
          </div>
          <div className="publish-style-in-box-brand">
            <p>Etat</p>
            <input
              type="text"
              placeholder="ex: Très bon état, état correct..."
              onChange={(event) => {
                setCondition(event.target.value);
              }}
            />
          </div>
          <div className="publish-style-in-box-brand">
            <p>Lieu</p>
            <input
              type="text"
              placeholder="ex: Paris, Nantes, Trappes..."
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="publish-style">
          <div className="publish-style-in-box">
            <p>Prix</p>
            <input
              type="number"
              placeholder="0,00 €"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>
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
