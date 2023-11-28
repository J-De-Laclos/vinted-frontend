import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/New_vinted_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Header.css";
const Header = ({ handleToken, token, search, setSearch }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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

            {showMenu ? (
              <FontAwesomeIcon
                className="bars"
                icon="fa-solid fa-xmark"
                style={{ color: "#747575" }}
                onClick={() => {
                  setShowMenu(!showMenu);
                }}
              />
            ) : (
              <FontAwesomeIcon
                className="bars"
                icon="fa-solid fa-bars"
                style={{ color: "#747575" }}
                onClick={() => {
                  setShowMenu(!showMenu);
                }}
              />
            )}
          </header>
          {showMenu ? (
            <div className="showMenu">
              <Link
                to={token ? "/publish" : "/login"}
                className="sell-items-button"
                onClick={() => {
                  setShowMenu(!showMenu);
                }}
              >
                Vends tes articles
              </Link>
              {!token ? (
                <div className="signup-login">
                  <Link
                    to="/signup"
                    className="signup-login-button"
                    onClick={() => {
                      setShowMenu(!showMenu);
                    }}
                  >
                    S'inscrire
                  </Link>
                  <Link
                    to="/login"
                    className="signup-login-button"
                    onClick={() => {
                      setShowMenu(!showMenu);
                    }}
                  >
                    Se connecter
                  </Link>
                </div>
              ) : (
                <button
                  className="deconnexion-button"
                  onClick={() => {
                    handleToken(null);
                  }}
                >
                  Déconnexion
                </button>
              )}
            </div>
          ) : (
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
          )}
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
