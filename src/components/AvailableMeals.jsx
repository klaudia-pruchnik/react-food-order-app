import Meals from "./Meals";
import ErrorPage from "./Error.jsx";
import useFetch from "../hooks/useFetch.js";
import { fetchAvailableMeals } from "../http.js";

export default function AvailableMeals() {
  const {
    isFetching,
    error,
    fetchedData: availableMeals,
  } = useFetch(fetchAvailableMeals, []);

  if (error) {
    return <ErrorPage title="Failed to fetch meals" message={error.message} />;
  }

  return (
    <Meals
      meals={availableMeals}
      isLoading={isFetching}
      loadingText="Fetching meals data..."
      fallbackText="No meals available."
    />
  );
}
