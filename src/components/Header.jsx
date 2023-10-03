import { Link } from "react-router-dom";
import logo from "../assets/logovinted.png";

const Header = ({ handleToken, token, search, setSearch }) => {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo vinted" />
      </Link>
      <input
        className="searchBar"
        type="text"
        value={search}
        placeholder="Rechercher des articles"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
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

        <Link to={token ? "/publish" : "/login"} className="sell-items-button">
          vends tes articles
        </Link>
      </div>
    </header>
  );
};

export default Header;
