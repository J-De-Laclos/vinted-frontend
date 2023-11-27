import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/New_vinted_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Header.css";
const Header = ({ handleToken, token, search, setSearch }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 978);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <section>
          <header>
            <Link to="/">
              <img src={logo} alt="logo vinted" />
            </Link>
            <FontAwesomeIcon
              className="bars"
              icon="fa-solid fa-bars"
              style={{ color: "#747575" }}
            />
          </header>
          <div className="searchBar">
            <FontAwesomeIcon
              className="icone"
              icon="fa-solid fa-magnifying-glass"
              style={{ color: "#999999" }}
            />
            <input
              type="text"
              value={search}
              placeholder=" Rechercher des articles"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
        </section>
      ) : (
        <header>
          <Link to="/">
            <img src={logo} alt="logo vinted" />
          </Link>
          <div className="searchBar">
            <FontAwesomeIcon
              className="icone"
              icon="fa-solid fa-magnifying-glass"
              style={{ color: "#999999" }}
            />
            <input
              type="text"
              value={search}
              placeholder=" Rechercher des articles"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
          <div className="align-button">
            {!token ? (
              <div className="signup-login">
                <Link to="/signup">
                  <button>S'inscrire</button>
                </Link>
                <Link to="/login">
                  <button>Se connecter</button>
                </Link>
              </div>
            ) : (
              <button
                onClick={() => {
                  handleToken(null);
                }}
              >
                Déconnexion
              </button>
            )}

            <Link
              to={token ? "/publish" : "/login"}
              className="sell-items-button"
            >
              Vends tes articles
            </Link>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
