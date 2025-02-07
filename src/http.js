export async function fetchAvailableMeals() {
  const response = await fetch("http://localhost:3000/meals");
  const resData = await response.json();

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch meals.");
  }

  return resData;
}

export async function updateOrder(order) {
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    body: JSON.stringify({ order }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update user data.");
  }

  const resData = await response.json();

  return resData.message;
}
