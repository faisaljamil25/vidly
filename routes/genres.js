const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

const genreValidation = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
};

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("The genre is not found"); // 404 Not Found
  res.send(genre);
});

router.post("/", async (req, res) => {
  const { error, value } = genreValidation(req.body);
  if (error) return res.status(400).send(error.message); // 400 Bad Request

  let genre = new Genre({
    name: req.body.name,
  });

  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error, value } = genreValidation(req.body);
  if (error) return res.status(400).send(error.message); // 400 Bad Request

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) return res.status(404).send("The genre is not found"); // 404 Not Found

  return genre;
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("The genre is not found"); // 404 Not Found

  return genre;
});

module.exports = router;