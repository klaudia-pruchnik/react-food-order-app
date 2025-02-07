import { useRef, useContext } from "react";

import logoImg from "../assets/logo.jpg";
import CartModal from "./CartModal.jsx";
import CheckoutModal from "./CheckoutModal.jsx";
import { CartContext } from "../store/shopping-cart-context.jsx";

export default function Header() {
  const cartModal = useRef();
  const checkoutModal = useRef();
  const { items } = useContext(CartContext);

  const cartQuantity = items.reduce((total, item) => total + item.quantity, 0);

  function handleOpenCartClick() {
    cartModal.current.open();
  }

  function handleCloseCartClick() {
    cartModal.current.close();
  }

  function handleOpenCheckoutClick() {
    checkoutModal.current.open();
  }

  function handleCloseCheckoutClick() {
    checkoutModal.current.close();
  }

  let cartModalActions = (
    <>
      <button className="text-button undefined" onClick={handleCloseCartClick}>
        Close
      </button>
      {cartQuantity > 0 && (
        <button
          className="button undefined"
          onClick={() => {
            handleOpenCheckoutClick();
            handleCloseCartClick();
          }}
        >
          Go to Checkout
        </button>
      )}
    </>
  );

  let checkoutModalActions = (
    <>
      <button
        className="text-button undefined"
        onClick={handleCloseCheckoutClick}
      >
        Close
      </button>
      <button className="button undefined">Submit Order</button>
    </>
  );

  return (
    <>
      <CartModal title="Your Cart" actions={cartModalActions} ref={cartModal} />
      <CheckoutModal
        actions={checkoutModalActions}
        ref={checkoutModal}
        order={items}
        title="Checkout"
      />
      <header id="main-header">
        <div id="title">
          <img src={logoImg} alt="Restaurant logo" />
          <h1>ReactFood</h1>
        </div>
        <nav>
          <button onClick={handleOpenCartClick} className="text-button">
            Cart ({cartQuantity})
          </button>
        </nav>
      </header>
    </>
  );
}
