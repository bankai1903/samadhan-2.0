# Day 14: Authentication Basics - Adding Users to My App!

👨‍💻 Today I dove into one of the most critical parts of web development: **Authentication**. I learned how to create a secure system where users can register for an account and log in. This was a backend-only task, so I focused entirely on the API logic and tested it using an API client. No more hardcoded data—we have real users now!

---

## 📚 What I Learned

1.  **Never Store Plain Passwords!** This was the #1 rule. I learned about **password hashing**, a process that converts a password into a long, irreversible string of characters. I used the `bcryptjs` library, which is the standard for this. It's impossible to reverse the hash to get the original password. 
2.  **JWT (JSON Web Tokens):** After a user logs in successfully, the server needs to give them a "key" to prove who they are for future requests. I learned to use JWTs for this. A JWT is like a secure, tamper-proof ID card that the server gives to the user. The user then shows this ID card (the token) with every request they make. The server can easily verify it's a valid ID card because it's digitally signed using a secret key.

3.  **The Authentication Flow:**
    * **Register:** A user sends their `username` and `password`. The server hashes the password and saves the new user to the MongoDB database.
    * **Login:** The user sends their `username` and `password` again.
    * The server finds the user by their username.
    * It uses `bcrypt` to compare the login password with the hashed password stored in the database.
    * If they match, the server generates a JWT and sends it back.
    * **Success!** The user is now "logged in" and can use the token.

---

## 📝 Mini Task

Build a backend-only API with two endpoints for user authentication:
* `POST /api/auth/register` - To create a new user.
* `POST /api/auth/login` - To log in a user and receive a JWT.

---

## ▶️ How to Set Up and Test

### 1. Setup

Follow the same backend setup as Day 13, including creating a `.env` file for your `MONGO_URI`. You also need to add a JWT secret to it.

```bash
# In the project folder, create your .env file
# It should contain two lines:
# MONGO_URI=your_mongodb_atlas_connection_string
# JWT_SECRET=this_is_a_long_and_random_secret_string

# Install dependencies
npm install
# Start the server
npm start
# The server will run on http://localhost:4000
```

### 2. Test with an API Client (like Postman or Insomnia)

To Register a New User:
Method: POST

URL: `http://localhost:4000/api/auth/register`

Body (JSON):
```bash
JSON

{
    "username": "vipin",
    "password": "password123"
}
```

To Login:
Method: POST

URL: `http://localhost:4000/api/auth/login`

Body (JSON):

```bash
JSON

{
    "username": "vipin",
    "password": "password123"
}
```
Successful Response:

```bash
JSON

{
    "token": "eyJhbGciOiJI..."
}
```

