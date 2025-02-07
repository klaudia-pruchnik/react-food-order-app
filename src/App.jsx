import Header from "./components/Header";
import AvailableMeals from "./components/AvailableMeals";
import CartContextProvider from "./store/shopping-cart-context";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <AvailableMeals />
    </CartContextProvider>
  );
}

export default App;
