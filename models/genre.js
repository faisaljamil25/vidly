import mongoose from 'mongoose';
import Joi from 'joi';

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Genre = mongoose.model('Genre', genreSchema);

const genreValidation = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(genre);
};

export { Genre, genreValidation };
