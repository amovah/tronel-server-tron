import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  creator: {
    type: String,
    required: true,
  },
  acceptor: {
    type: String,
    default: 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
  },
  currency: {
    type: String,
    required: true,
  },
  predictPrice: {
    type: Number,
    required: true,
  },
  predictTime: {
    type: Number,
    required: true,
  },
  predictType: {
    type: Number,
    required: true,
  },
  submittedPrice: {
    type: Number,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
  },
  betAmount: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('bet', schema);
