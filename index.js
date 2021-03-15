const express = require("express");
const app = express();

const genres = require("./routes/genres");
const home = require("./routes/home");

// Middleware
app.use(express.json());

// Routes
app.use("/api/genres", genres);
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
