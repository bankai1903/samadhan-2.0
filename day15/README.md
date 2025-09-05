# Day 15: React + Auth - The Complete Full-Stack App! 🚀

👨‍💻 This is the day it all came together. I've successfully integrated the React frontend, the Node.js backend, the MongoDB database, and JWT authentication into a single, cohesive, and **secure** application. Users can now register, log in, and manage their **own private notes**. This feels like a real-world app, and I'm incredibly proud of how all the pieces connect.

---

## 📚 What I Learned

1.  **Full-Stack Authentication Flow:** I now understand the complete cycle:
    * React login form sends user credentials to the API.
    * The API validates them and sends back a JWT.
    * React saves this token in the browser's **localStorage**.
    * For every subsequent request to a secure API endpoint, React attaches the token to the `Authorization` header (`Bearer <token>`).

2.  **Backend Protected Routes (Middleware):** I learned to use **Express middleware**. I created a special `auth` function that runs before my note-handling routes. It checks for a valid JWT in the request header. If the token is valid, it lets the request proceed; otherwise, it rejects it with an "unauthorized" error. This is how the server protects its data. 
3.  **Frontend Protected Routes:** On the frontend, I used the `react-router-dom` library to create a custom `<PrivateRoute>` component. This component checks if a token exists in localStorage.
    * If **yes**, it shows the requested page (like the user's dashboard).
    * If **no**, it automatically redirects the user to the `/login` page. This prevents anyone from even seeing the content of a protected page.

4.  **User-Specific Data:** I updated my `Note` model in the database to include a reference to the `User` who created it. Now, when a user requests their notes, the API query specifically fetches only the notes linked to their user ID. This ensures users can only ever see their own data.

---

## 📝 Mini Task

Create a **complete full-stack Notes App with authentication**.
* Users must register and log in.
* The main notes page must be a protected route.
* Users can only create, view, and delete their own notes.

---

## ▶️ How to Run the Project

The setup is the same as before, requiring two terminals.

### 1. Run the Backend

```bash
cd backend
# Make sure your .env file has MONGO_URI and JWT_SECRET
npm install
npm start
```

### 2. Run the Frontend

```bash
cd frontend
npm install
npm start
```

Now, when you visit `http://localhost:3000`, you will be redirected to the login page instead of seeing the app directly!
