import { CardElement } from "@stripe/react-stripe-js";
import MDButton from "components/MDButton";

function StripeCard() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />

      <MDButton id="checkout-and-portal-button" type="submit">
        Checkout
      </MDButton>
    </form>
  );
}

export default StripeCard;
