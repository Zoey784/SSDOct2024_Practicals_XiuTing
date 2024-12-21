/*Part 8*/
const express = require("express");
const booksController = require("./controllers/booksController");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser"); // Import body-parser
const validateBook = require("./middlewares/validateBook");

const app = express();
const port = 3000;

// Include body-parser middleware to handle JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

app.get("/books", booksController.getAllBooks);
app.get("/books/:id", booksController.getBookById);
app.post("/books", validateBook, booksController.createBook); // POST for creating books (can handle JSON data)
app.put("/books/:id", validateBook, booksController.updateBook);
app.delete("/books/:id", booksController.deleteBook); // DELETE for deleting books

// ... existing code for database connection and graceful shutdown

app.listen(port, async () => {
    // ... existing code
    try {
          // Connect to the database
          await sql.connect(dbConfig);
          console.log("Database connection established successfully");
        } catch (err) {
          console.error("Database connection error:", err);
          // Terminate the application with an error code (optional)
          process.exit(1); // Exit with code 1 indicating an error
        }
      
        console.log(`Server listening on port ${port}`);
  });
  
  process.on("SIGINT", async () => {
    console.log("Server is gracefully shutting down");
    // Perform cleanup tasks (e.g., close database connections)
    await sql.close();
    console.log("Database connection closed");
    process.exit(0); // Exit with code 0 indicating successful shutdown
  });





/*Part 7*/
// const express = require("express");
// const booksController = require("./controllers/booksController");
// const sql = require("mssql");
// const dbConfig = require("./dbConfig");
// const bodyParser = require("body-parser"); // Import body-parser

// const app = express();
// const port = 3000;

// // Include body-parser middleware to handle JSON data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

// app.get("/books", booksController.getAllBooks);
// app.get("/books/:id", booksController.getBookById);
// app.post("/books", booksController.createBook); // POST for creating books (can handle JSON data)
// app.put("/books/:id", booksController.updateBook); // PUT for updating books
// app.delete("/books/:id", booksController.deleteBook); // DELETE for deleting books

// // ... existing code for database connection and graceful shutdown

// app.listen(port, async () => {
//     // ... existing code
//     try {
//           // Connect to the database
//           await sql.connect(dbConfig);
//           console.log("Database connection established successfully");
//         } catch (err) {
//           console.error("Database connection error:", err);
//           // Terminate the application with an error code (optional)
//           process.exit(1); // Exit with code 1 indicating an error
//         }
      
//         console.log(`Server listening on port ${port}`);
//   });
  
//   process.on("SIGINT", async () => {
//     console.log("Server is gracefully shutting down");
//     // Perform cleanup tasks (e.g., close database connections)
//     await sql.close();
//     console.log("Database connection closed");
//     process.exit(0); // Exit with code 0 indicating successful shutdown
//   });
  




/*Part 6*/
// const express = require("express");
// const booksController = require("./controllers/booksController");
// const sql = require("mssql");
// const dbConfig = require("./dbConfig");
// const bodyParser = require("body-parser"); // Import body-parser

// const app = express();
// const port = 3000;

// // Include body-parser middleware to handle JSON data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

// app.get("/books", booksController.getAllBooks);
// app.get("/books/:id", booksController.getBookById);
// app.post("/books", booksController.createBook); // POST for creating books (can handle JSON data)

// // ... existing code for database connection and graceful shutdown

// app.listen(port, async () => {
//   // ... existing code
//   try {
//         // Connect to the database
//         await sql.connect(dbConfig);
//         console.log("Database connection established successfully");
//       } catch (err) {
//         console.error("Database connection error:", err);
//         // Terminate the application with an error code (optional)
//         process.exit(1); // Exit with code 1 indicating an error
//       }
    
//       console.log(`Server listening on port ${port}`);
// });

// process.on("SIGINT", async () => {
//   console.log("Server is gracefully shutting down");
//   // Perform cleanup tasks (e.g., close database connections)
//   await sql.close();
//   console.log("Database connection closed");
//   process.exit(0); // Exit with code 0 indicating successful shutdown
// });

/*Part 5*/
// const express = require("express");
// const booksController = require("./controllers/booksController");
// const sql = require("mssql");
// const dbConfig = require("./dbConfig");

// const app = express();
// const port = process.env.PORT || 3000; // Use environment variable or default port

// // Routes for GET requests (replace with appropriate routes for update and delete later)
// app.get("/books", booksController.getAllBooks);
// app.get("/books/:id", booksController.getBookById);

// app.listen(port, async () => {
//   try {
//     // Connect to the database
//     await sql.connect(dbConfig);
//     console.log("Database connection established successfully");
//   } catch (err) {
//     console.error("Database connection error:", err);
//     // Terminate the application with an error code (optional)
//     process.exit(1); // Exit with code 1 indicating an error
//   }

//   console.log(`Server listening on port ${port}`);
// });

// // Close the connection pool on SIGINT signal
// process.on("SIGINT", async () => {
//   console.log("Server is gracefully shutting down");
//   // Perform cleanup tasks (e.g., close database connections)
//   await sql.close();
//   console.log("Database connection closed");
//   process.exit(0); // Exit with code 0 indicating successful shutdown
// });

/*Part 4*/
// const express = require("express");
// const sql = require("mssql"); // Assuming you've installed mssql
// const dbConfig = require("./dbConfig");

// const app = express();
// const port = process.env.PORT || 3000; // Use environment variable or default port

// app.listen(port, async () => {
//   try {
//     // Connect to the database
//     await sql.connect(dbConfig);
//     console.log("Database connection established successfully");
//   } catch (err) {
//     console.error("Database connection error:", err);
//     // Terminate the application with an error code (optional)
//     process.exit(1); // Exit with code 1 indicating an error
//   }

//   console.log(`Server listening on port ${port}`);
// });

// // Close the connection pool on SIGINT signal
// process.on("SIGINT", async () => {
//   console.log("Server is gracefully shutting down");
//   // Perform cleanup tasks (e.g., close database connections)
//   await sql.close();
//   console.log("Database connection closed");
//   process.exit(0); // Exit with code 0 indicating successful shutdown
// });