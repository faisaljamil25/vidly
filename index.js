const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Drama" },
  { id: 4, name: "Romance" },
  { id: 5, name: "Comedy" },
  { id: 6, name: "Sci-fi" },
  { id: 7, name: "Crime" },
  { id: 8, name: "Thriller" },
];

const genreValidation = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
};

app.get("/", (req, res) => {
  res.send("Vidly App!");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("The genre is not found"); // 404 Not Found
  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  const { error, value } = genreValidation(req.body);
  if (error) return res.status(400).send(error.message); // 400 Bad Request

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("The genre is not found"); // 404 Not Found

  const { error, value } = genreValidation(req.body);
  if (error) return res.status(400).send(error.message); // 400 Bad Request

  genre.name = req.body.name;
  return genre;
});

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("The genre is not found"); // 404 Not Found

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  return genre;
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
