import Meal from "./Meal";

export default function Meals({ meals, isLoading, loadingText, fallbackText }) {
  return (
    <>
      {isLoading && <p className="center">{loadingText}</p>}
      {!isLoading && meals.length === 0 && (
        <p className="center">{fallbackText}</p>
      )}
      {!isLoading && meals.length > 0 && (
        <ul id="meals">
          {meals.map((meal) => (
            <li className="meal-item" key={meal.id}>
              <Meal mealData={meal} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
