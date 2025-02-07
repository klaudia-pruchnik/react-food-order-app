import { useContext } from "react";

import { CartContext } from "../store/shopping-cart-context.jsx";

export default function Meal({ mealData }) {
  const { addItemToCart } = useContext(CartContext);

  return (
    <article>
      <img
        src={`http://localhost:3000/${mealData.image}`}
        alt={mealData.name}
      />
      <div>
        <h3>{mealData.name}</h3>
        <p className="meal-item-price">${mealData.price}</p>
        <p className="meal-item-description">{mealData.description}</p>
      </div>
      <p className="meal-item-actions">
        <button
          onClick={() => addItemToCart(mealData.id)}
          className="button undefined"
        >
          Add to Cart
        </button>
      </p>
    </article>
  );
}
