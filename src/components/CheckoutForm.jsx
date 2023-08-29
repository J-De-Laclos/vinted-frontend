import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const stripe = useStripe();

  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      const cardElement = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'utilisateur", // J'envoie un identifiant de ce lui qui paye pour savoir qui est à l'origine de la transaction
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      //   Je fais une requête à mon back et je lui envoie mon stripeToken
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          stripeToken: stripeToken,
        }
      );
      console.log(response.data);
      setIsLoading(false);

      if (response.data.status === "succeeded") {
        setPaymentCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Formulaire de paiement</h1>
      <CardElement />
      {paymentCompleted === true ? (
        <p>Payement Completed</p>
      ) : (
        <input type="submit" disabled={isLoading} />
      )}
    </form>
  );
};

export default CheckoutForm;
