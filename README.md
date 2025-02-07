# React Food Order App

A food ordering application built with React as part of a Udemy course. The app allows users to browse available meals, add them to a shopping cart, and proceed to checkout. It utilizes context for state management, custom hooks for fetching data, and modal components for cart and checkout interactions.

## Features
- **React Context API & useReducer** for shopping cart management.
- **Custom hooks** (`useFetch`, `useDialogHandle`) to simplify data fetching and modal handling.
- **Dynamic UI updates** when adding or removing items from the cart.
- **Modals** for viewing cart items and completing checkout.
- **Basic backend** using JSON files (`meals.json` and `orders.json`).
- **Error handling** and loading states for better UX.

## Installation
1. Clone this repository:
   `git clone https://github.com/your-username/react-food-order-app.git`
2. Install dependencies:
   `npm install`
4. Start the development server:
   `npm run dev`

## How It Works
- **Meals Display:** Fetches meal data from a JSON backend and displays it.
- **Adding to Cart:** Users can add meals to the shopping cart, which updates the UI dynamically.
- **Cart Management:** Items can be removed, and quantities updated using `useReducer`.
- **Checkout Process:** Users fill in a form, and the order is sent to the backend.
- **Success & Error Handling:** Displays appropriate messages for order submission status.

## Technologies Used
- React.js  
- React Context API  
- React Hooks (`useState`, `useEffect`, `useReducer`, `useContext`)  
- JavaScript (ES6+)  
- CSS (for styling)  

## License
This project is for educational purposes and created as part of the React course on Udemy.
