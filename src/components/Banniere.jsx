import tear from "../assets/tear.svg";
import { useNavigate } from "react-router-dom";

const Banniere = () => {
  const navigate = useNavigate();
  return (
    <div className="img-container">
      <img
        className="banniere"
        src="https://static.vinted.com/assets/seller-promotion/gender_test/a/banner-wide-7403f719caac875cfeea61593da7fc7e7320c126193b4ff654e4397f54d430ae.jpg"
        alt="bannière "
      />

      <img className="tear-effect" src={tear} alt="tear effect" />
      <div className="block-into-banniere">
        Prêts à faire du tri dans vos placards ?
        <button
          className="btn-in-banniere"
          onClick={() => {
            navigate("/publish");
          }}
        >
          Commencer à vendre
        </button>
      </div>
    </div>
  );
};

export default Banniere;
