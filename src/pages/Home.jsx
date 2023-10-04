import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Banniere from "../components/Banniere";
import { Circles as Loader } from "react-loader-spinner";

const Home = ({ search }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(message.error);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <div className="loader">
      <Loader color="#2CB1BA" height={80} width={80} />
    </div>
  ) : (
    <>
      <div>
        <Banniere />
      </div>
      <div className="home-container">
        {data.offers.map((offer) => {
          return (
            <Link
              key={offer._id}
              to={`/offer/${offer._id}`}
              className="home-details"
            >
              {offer.owner.account.avatar && (
                <img
                  className="profil-image"
                  src={offer.owner.account.avatar.secure_url}
                  alt="profil"
                />
              )}
              <span className="home-username">
                {offer.owner.account.username}
              </span>
              <div>
                <img
                  className="home-image"
                  src={offer.product_image.secure_url}
                  alt="clothe"
                />
              </div>

              <p className="price">{offer.product_price} €</p>
              {offer.product_details.map((detail, index) => {
                if (detail.MARQUE || detail.TAILLE) {
                  return (
                    <p className="home-brand" key={index}>
                      {detail.MARQUE || detail.TAILLE}
                    </p>
                  );
                } else {
                  return null;
                }
              })}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Home;
