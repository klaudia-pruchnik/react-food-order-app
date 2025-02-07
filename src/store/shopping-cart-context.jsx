import { createContext, useReducer } from "react";
import { fetchAvailableMeals } from "../http.js";
import useFetch from "../hooks/useFetch.js";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
  totalPrice: 0,
});

function shoppingCartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload.productId
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      if (!action.payload.error) {
        const pickedMeal = action.payload.availableMeals.find(
          (meal) => meal.id === action.payload.productId
        );

        updatedItems.push({
          id: action.payload.productId,
          name: pickedMeal.name,
          price: pickedMeal.price,
          quantity: 1,
        });
      }
      // handle error
    }

    return {
      items: updatedItems,
    };
  }

  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      items: [],
    };
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );

  const { error, fetchedData: availableMeals } = useFetch(
    fetchAvailableMeals,
    []
  );

  function handleAddItemToCart(productId) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: {
        productId,
        availableMeals,
        error,
      },
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: {
        productId,
        amount,
      },
    });
  }

  function handleClearCart() {
    shoppingCartDispatch({
      type: "CLEAR_CART",
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
    clearCart: handleClearCart,
    totalPrice: shoppingCartState.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ),
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
