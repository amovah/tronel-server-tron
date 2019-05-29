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
  joiner: {
    type: String,
    default: '0x00000000000000000',
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
  balance: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('ret', schema);
