import tear from "../assets/tear.svg";
import ban from "../assets/ban-vinted.jpeg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Banniere.css";

const Banniere = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

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
        <div>
          <div className="img-container">
            {/* <img
              className="banniere"
              src="https://static.vinted.com/assets/seller-promotion/gender_test/a/banner-wide-7403f719caac875cfeea61593da7fc7e7320c126193b4ff654e4397f54d430ae.jpg"
              alt="bannière "
            /> */}
            <img className="banniere" src={ban} alt="bannière " />
            <img className="tear-effect" src={tear} alt="tear effect" />
          </div>
          <div className="mob-position">
            <p>Prêts à faire du tri dans vos placards ?</p>
            <button
              className="btn-in-banniere"
              onClick={() => {
                navigate("/publish");
              }}
            >
              Vends maintenant
            </button>
          </div>
        </div>
      ) : (
        <div className="img-container">
          <img
            className="banniere"
            src="https://static.vinted.com/assets/seller-promotion/gender_test/a/banner-wide-7403f719caac875cfeea61593da7fc7e7320c126193b4ff654e4397f54d430ae.jpg"
            alt="bannière "
          />

          <img className="tear-effect" src={tear} alt="tear effect" />

          <div className="block-into-banniere">
            Prêts à faire
            <br /> du tri dans vos
            <br /> placards ?
            <button
              className="btn-in-banniere"
              onClick={() => {
                navigate("/publish");
              }}
            >
              Vends maintenant
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Banniere;
