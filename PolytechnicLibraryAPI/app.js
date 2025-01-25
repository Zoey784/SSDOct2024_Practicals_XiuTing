require("dotenv").config(); // Load environment variables
const express = require("express");
const bodyParser = require("body-parser");
const { verifyJWT, authorizeRole } = require("./middleware/userMiddleware");
const { registerUser, login } = require("./controllers/userController");
const { getAllBooks, updateBookAvailability } = require("./controllers/bookController");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests

// Routes
// Authentication routes
app.post("/register", registerUser);
app.post("/login", login);

// app.get("/books", authorizeUser1.verifyJWT, authorizeUser1.authorizeRole("member", "librarian"), bookController)
// app.put("/books/:id/availability", authorizeUser1.authorizeRole("librarian"), bookController.updateBookAvailability);

// Books routes
app.get("/books", verifyJWT, getAllBooks); // Accessible by both members and librarians
app.put(
  "/books/:bookId/availability",
  verifyJWT,
  authorizeRole(["librarian"]), // Restrict access to librarians
  updateBookAvailability
);

// Default route for invalid endpoints
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500). send("Endpoint not found");
});

// Start the server
app.listen(PORT, async () => {
  try{
    await sql.connect(dbConfig);
    console.log("Database connection establised successfully");
  }
  catch (err) {
    console.error("Database connection error:", err);
  }
});
