import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Circles as Loader } from "react-loader-spinner";
import "../styles/Offer.css";
import cat from "../assets/img-vinted-offer.png";

const Offer = ({ token }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offer/" + id
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

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

  return isLoading ? (
    <div className="loader">
      <Loader color="#017580" height={80} width={80} />
    </div>
  ) : (
    <>
      {isMobile ? (
        <div className="offer-container">
          <img src={cat} className="cat-img" />
          <img
            src={data.product_image.secure_url}
            alt="clothe"
            className="offer-image"
          />
          <div className="offer-details">
            <p className="offer-price">{data.product_price} €</p>

            {data.product_details.map((detail, index) => {
              const keyName = Object.keys(detail);
              // console.log(keyName[0]);
              return (
                <div className="offer-detail" key={index}>
                  <div className="offer-detail-a">{keyName[0]}</div>
                  <div className="offer-detail-b">{detail[keyName[0]]}</div>
                </div>
              );
            })}
            <h2 className="offer-title">{data.product_name}</h2>

            <Link to={token ? "/payment" : "/login"} className="offer-buy">
              Acheter
            </Link>
          </div>
        </div>
      ) : (
        <div className="offer-container">
          <img
            src={data.product_image.secure_url}
            alt="clothe"
            className="offer-image"
          />
          <div className="offer-details">
            <p className="offer-price">{data.product_price} €</p>
            {data.product_details.map((detail, index) => {
              const keyName = Object.keys(detail);
              // console.log(keyName[0]);
              return (
                <div className="offer-detail" key={index}>
                  <span>{keyName[0]}</span>
                  <span>{detail[keyName[0]]}</span>
                </div>
              );
            })}
            <h2 className="offer-title">{data.product_name}</h2>

            <Link to={token ? "/payment" : "/login"} className="offer-buy">
              Acheter
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Offer;
