# Day 16: E-commerce Store - Building a Complete Online Shop! 🛒

👨‍💻 This was a monster of a project! Today, I built a complete, full-stack E-commerce store from the ground up. It features a product catalog, a persistent shopping cart for each user, and a secure payment flow using **Stripe**. This project pushed my MERN stack skills to the limit and taught me how to structure a much larger, feature-rich application.

---

## ✨ Key Features

1.  **Product Catalog:** A publicly viewable list of products fetched from the database.
2.  **User Authentication:** Users can register and log in. A valid account is required to use the shopping cart and check out.
3.  **Persistent Shopping Cart:** Logged-in users can add/remove items from their cart. The cart's contents are saved to their user profile in MongoDB, so it persists between sessions.
4.  **Secure Payment Integration:** I integrated **Stripe** to handle payments. The frontend uses **Stripe Elements**, which provides a secure, PCI-compliant form for entering card details. The backend creates a `PaymentIntent` to process the charge safely. Everything runs in **test mode**, so no real money is involved! 
---

## 🧠 New Concepts I Learned

* **Advanced Data Modeling:** I designed schemas for products and figured out how to embed a shopping cart (as an array of product references) directly into the `User` model.
* **Global State Management with Context API:** Instead of passing props down multiple levels ("prop drilling"), I used React's **Context API** to create a global `CartContext`. This makes the cart's state and functions (like `addToCart`) available to any component in the app.
* **Integrating a Payment Gateway:** I learned the full flow of integrating a third-party service like Stripe, including managing secret keys, creating a secure payment form on the client, and processing payments on the server.

---

## ▶️ How to Run the Project

### Prerequisites

You will need accounts and API keys for:
1.  **MongoDB Atlas:** For the database connection URI.
2.  **Stripe:** For your public and secret API keys.

### 1. Run the Backend

```bash
# Navigate to the backend folder
cd backend

# Create a .env file with your secrets:
# MONGO_URI=your_mongodb_uri
# JWT_SECRET=your_jwt_secret
# STRIPE_SECRET_KEY=your_stripe_secret_key

# Install dependencies and start
npm install
npm start
```
### 2. Run the Frontend

```bash
# In a new terminal, navigate to the frontend folder
cd frontend

# Create a .env file with your Stripe public key:
# REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Install dependencies and start
npm install
npm start
