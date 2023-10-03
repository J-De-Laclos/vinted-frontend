import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Offer = ({ token }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

  return isLoading ? (
    <p>Loading...</p>
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
  );
};

export default Offer;
