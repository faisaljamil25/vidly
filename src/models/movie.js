import mongoose from 'mongoose';
import Joi from 'joi';

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  numberInStock: {
    type: Number,
    default: 0,
  },
  dailyRentalRate: {
    type: Number,
    default: 0,
  },
});
