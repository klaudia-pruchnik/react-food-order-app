import { forwardRef, useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../store/shopping-cart-context";
import useDialogHandle from "../hooks/useDialogHandle";
import { updateOrder } from "../http.js";
import Input from "./Input";
import ErrorPage from "./Error.jsx";
import Success from "./Success.jsx";

const CheckoutModal = forwardRef(function Modal(
  { actions, order, title },
  ref
) {
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const dialog = useRef();
  const { totalPrice, clearCart } = useContext(CartContext);

  useDialogHandle(ref, dialog);

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    const orderData = {
      customer: customerData,
      items: order.items,
      totalPrice,
    };

    try {
      await updateOrder(orderData);
      console.log("Zamówienie zostało wysłane!");
      setOrderSubmitted(true);
    } catch (error) {
      console.error("Błąd przy wysyłaniu zamówienia:", error);
      setError(error);
    }

    console.log(customerData);
    console.log(order);
  }

  function handleCloseModal() {
    clearCart();
    dialog.current.close();
    setOrderSubmitted(false);
  }

  return createPortal(
    <dialog className="modal " ref={dialog}>
      {orderSubmitted ? (
        <Success
          message="Your order was submitted successfully."
          information="We will get back to you with more details via email within the next few
        minutes."
          onClose={handleCloseModal}
        />
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>{title}</h2>
          <p>Total Amount: ${totalPrice}</p>
          <Input label="Full Name" id="name" name="name" required type="text" />
          <Input
            label="E-Mail Address"
            id="email"
            name="email"
            required
            type="email"
          />
          <Input
            label="Street"
            id="street"
            name="street"
            required
            type="text"
          />
          <div className="control-row">
            <Input
              label="Postal Code"
              id="postal-code"
              name="postal-code"
              required
              type="text"
            />
            <Input label="City" id="city" name="city" required type="text" />
          </div>
          {error && (
            <ErrorPage title="Failed to submit order" message={error.message} />
          )}
          <p className="modal-actions">{actions}</p>
        </form>
      )}
    </dialog>,
    document.getElementById("modal")
  );
});

export default CheckoutModal;
