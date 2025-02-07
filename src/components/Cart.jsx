import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

export default function Cart() {
  const { items, updateItemQuantity, totalPrice } = useContext(CartContext);

  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <>
      <ul>
        {items.map((item) => {
          return (
            <li className="cart-item" key={item.id}>
              <p>
                {item.name} - {item.quantity} x ${item.price}
              </p>
              <p className="cart-item-actions">
                <button onClick={() => updateItemQuantity(item.id, -1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateItemQuantity(item.id, 1)}>
                  +
                </button>
              </p>
            </li>
          );
        })}
      </ul>
      <p className="cart-total">{formattedTotalPrice}</p>
    </>
  );
}
